require("dotenv").config();

const config = {
    host: process.env.host,
    user: process.env.user,
    database: process.env.database
};

module.exports = { config };
