const mysql = require("mysql2/promise");

const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "tickets-app"
    });
    return connection;
}

const tableExists = async (connection, tableName) => {
    try {
        await connection.query(`SELECT 1 FROM ${tableName} LIMIT 1;`);
        return true;
    } catch (err) {
        return false;
    }
};

async function createUsersTable() {
    //Create connection
    const connection = await getConnection();
    const _tableExists = await tableExists(connection, "users");
    if (_tableExists) {
        console.log("Table already exists");
        return;
    }
    try {
        // Table Query
        await connection.execute(
            `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20), password VARCHAR(20));`);
        console.log("Table created");
    } catch (e) {
        console.error("Table was not created", e);
    }
    connection.end();
}

module.exports = { getConnection, createUsersTable };

