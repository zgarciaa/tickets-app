const mysql = require("mysql2/promise");
const sqlSentences = require("./sqlSentences");

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "tickets"
        });
        return connection;
    } catch (e) {
        console.error(e);
    }
};

const createDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root"
        });
        const [rows, fields] = await connection.execute(`SHOW DATABASES LIKE 'tickets';`);
        if (rows.length > 0) {
            console.log("Database already exists");
            connection.end();
            return;
        }
        await connection.execute(`CREATE DATABASE tickets;`);
        connection.end();
        console.log("Database was created succesfully");
    } catch (e) {
        console.error(e);
    }
};

const createTable = async (tableName, tableSql) => {
    try {
        const connection = await getConnection();
        const [rows, fields] = await connection.execute(`SHOW TABLES LIKE '${tableName}'`);
        if (rows.length > 0) {
            console.log(`Table '${tableName}' already exists`);
            connection.end();
            return;
        }
        await connection.execute(tableSql);
        connection.end();
        console.log(`Table '${tableName}' was created succesfully`);
    } catch (e) {
        console.error(e);
        console.log("fallaste");
    }
};

const createRolesTable = async () => {
    try {
        await createTable("roles", sqlSentences.rolesTable);
        const connection = await getConnection();
        await connection.execute(sqlSentences.insertRoles);
        connection.end();
    } catch (e) {
        console.error(e);
    }
}

const initDb = async () => {
    await createDb();
    await createRolesTable();
    await createTable("registros", sqlSentences.registerTable);
};

module.exports = { initDb };

