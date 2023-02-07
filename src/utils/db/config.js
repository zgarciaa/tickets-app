const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbConnection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

module.exports = { dbConnection };
