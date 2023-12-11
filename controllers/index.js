const XLSX = require("xlsx");
const Users = require("../models/processModel");
const outputPath = "storage/outputs";

exports.index = async (req, res) => {
    const users = await Users.findAll();
    return res.render("index", { users });
};

exports.import = async (req, res) => {
    const wb = XLSX.readFile(req.file.path);
    const sheets = wb.SheetNames;
    userData = []
    if (sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        console.log('data is:', data);
     
      
        function isValidEmail(email) {

            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return emailRegex.test(email);
        }


        const users = data.map(row => {

            let errorMessage = ""
            if (!isValidEmail(row.email)) {
                errorMessage = "Invalid email address";
            } else {
                errorMessage = ""
            }

            return {

                id: row["id"],
                name: row["name"],
                email: row["email"],
                process: row["process"],
                status: row["status"],
                error: errorMessage
            }

        })
        await Users.bulkCreate(users);
      
     
        const workSheet = XLSX.utils.json_to_sheet(users);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "users")
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        XLSX.writeFile(workBook, "usersData.xlsx")
        res.send("data added..")

    }

};


exports.export = async (req, res) => {
    const users = await Users.findAll({
        attributes: ["id", "name", "email", "process", "status"],
        raw: true
    });
    console.log("users is:", users);
    const headings = [["id", "name", "email", "process", "status"]];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users, {
        origin: "A2",
        skipHeader: true
    });

    XLSX.utils.sheet_add_aoa(ws, headings);
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const buffer = XLSX.write(wb, { bookType: "csv", type: "buffer" });
    res.attachment("users.csv");
    return res.send(buffer);
}

