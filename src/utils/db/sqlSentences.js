
// Create table and roles
const rolesTable = `
    CREATE TABLE roles (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );`;

const insertRoles =
    `INSERT INTO roles (nombre) SELECT 'cliente' UNION SELECT 'cortesia' UNION SELECT 'expositor';`;

// Create register table
const registersTable =
    `CREATE TABLE registros (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        rol_id INT NOT NULL,
        huella_digital VARCHAR(255),
        fecha_registro DATETIME NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (rol_id) REFERENCES roles(id)
    );`;

const insertInitialRegisters =
    `INSERT INTO registros (nombre, rol_id, huella_digital, fecha_registro)
        VALUES ('Nicolas', '1', 'huella_0', 'fecha_0');`;

const workersTable =
    `CREATE TABLE trabajadores (
        id INT NOT NULL AUTO_INCREMENT,
        usuario VARCHAR(255) NOT NULL,
        contraseña VARCHAR(255) NOT NULL,
        fecha_registro DATETIME NOT NULL,
        PRIMARY KEY (id)
    );`;

module.exports = {
    rolesTable,
    registersTable,
    workersTable,
    insertRoles,
    insertInitialRegisters
};
