
// Create table and roles
const rolesTable = `
    CREATE TABLE roles (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );`;

const insertRoles = `
    INSERT INTO roles (nombre)
    SELECT 'trabajador' UNION SELECT 'cliente' UNION SELECT 'expositor' UNION SELECT 'cortesia';`;

// Create register table
const registerTable =
    `CREATE TABLE registros (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        rol_id INT NOT NULL,
        huella_digital VARCHAR(255),
        fecha_registro DATETIME NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (rol_id) REFERENCES roles(id)
    );`;

module.exports = { rolesTable, registerTable, insertRoles };
