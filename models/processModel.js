const Sequelize = require("sequelize");
const sequelize = require("../config/dbConfig");


const Users = sequelize.define(
    "process_line",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING(255)
        },
        process: {
            type: Sequelize.STRING(255)
        },
        status: {
            type: Sequelize.STRING(255)
        },
        email: {
            type: Sequelize.STRING(255)
        },
        error: {
            type: Sequelize.STRING(255)
        }

    }, { timestamps: false }
);

module.exports = Users;



