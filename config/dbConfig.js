require('dotenv').config()
// console.log(process.env.SQL_DB,process.env.SQL_USERNAME,process.env.SQL_PASSWORD,process.env.HOST,process.env.DB)
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
 SQL_DB="processdb", process.env.SQL_USERNAME, process.env.SQL_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DB,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    pool: {
      max: 20,
      min: 0,
      acquire: 50000,
      idle: 50000
    },
    logging: process.env.NODE_ENV == 'development' ? true : true
  }
);
module.exports = sequelize;