const { DataTypes } = require("sequelize");
const { dbConnection } = require("./connection");

const Worker = dbConnection.define("Worker", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Role = dbConnection.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const Register = dbConnection.define("Register", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id"
        }
    },
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const createRoles = async () => {
    try {
        const roleCount = await Role.count();
        if (roleCount === 0) {
            await Role.bulkCreate([
                { name: "Trabajador" },
                { name: "Expositor" },
                { name: "General" },
                { name: "Cortesia" }
            ]);
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports = { Worker, Role, Register, createRoles };