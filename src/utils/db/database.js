const mysql = require("mysql2/promise");
const sql = require("./sqlSentences");
const { config } = require("../db/config");

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection(config);
        return connection;
    } catch (e) {
        console.error(e);
    }
};

const createDb = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: config.host,
            user: config.user
        });
        const [rows] = await connection.execute(`SHOW DATABASES LIKE 'tickets';`);
        if (rows.length > 0) {
            connection.end();
            return;
        }
        await connection.execute(`CREATE DATABASE tickets;`);
        connection.end();
        console.log("Database was created succesfully");
    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
};

const createTables = async () => {
    const connection = await getConnection();
    try {
        const [rowsRoles] = await connection.execute(`SHOW TABLES LIKE 'roles'`);
        const [rowsRegister] = await connection.execute(`SHOW TABLES LIKE 'registros'`);
        const [rowsWorkers] = await connection.execute(`SHOW TABLES LIKE 'trabajadores'`);
        if (rowsRoles.length === 0) {
            await connection.execute(sql.rolesTable);
            await connection.execute(sql.insertRoles);
            await connection.commit();
            console.log("Table 'roles' created succesfully");
        } else {
            console.log("Table 'roles' already exists");
        }
        if (rowsRegister.length === 0) {
            await connection.execute(sql.registersTable);
            await connection.execute(sql.insertInitialRegisters);
            await connection.commit();
            console.log("Table 'registros' created succesfully");
        } else {
            console.log("Table 'registros' already exists");
        }
        if (rowsWorkers.length === 0) {
            await connection.execute(sql.workersTable);
            await connection.commit();
            console.log("Table 'trabajadores' created succesfully");
        } else {
            console.log("Table 'trabajadores' already exists");
        }
    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
};

const insertNewRegister = async ({ name, roleId, fingerprint }) => {
    const connection = await getConnection();
    try {
        const registrationDate = new Date();
        await connection.execute(`INSERT INTO registros (nombre, rol_id, huella_digital, fecha_registro)
        VALUES (?, ?, ?, ?)`, [name, roleId, fingerprint, registrationDate]);
        console.log("Register added succesfully");
        connection.end();
    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
};

const insertWorker = async ({ username, password }) => {
    const connection = await getConnection();
    try {
        const registrationDate = new Date();
        await connection.execute(`INSERT INTO trabajadores (usuario, contraseña, fecha_registro)
        VALUES (?, ?, ?)`, [username, password, registrationDate]);
        console.log("Worker added succesfully");
        connection.end();
    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
};

const checkWorkerExists = async ({ username, password }) => {
    const connection = await getConnection();
    try {
        const decryptedUsername = AES.decrypt(username, "enc_key").toString(enc.Utf8);
        const decryptedPassword = AES.decrypt(password, "enc_key").toString(enc.Utf8);
        const [result] = await connection.execute(`
            SELECT COUNT(*)
            FROM trabajadores
            WHERE usuario = ? AND contraseña = ?
        `, [decryptedUsername, decryptedPassword]);
        const userExists = result[0]["COUNT(*)"] > 0;
        return userExists;
    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
};

const initDb = async () => {
    await createDb();
    await createTables();
};

module.exports = { initDb, insertNewRegister, insertWorker };

