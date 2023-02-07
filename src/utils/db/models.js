const { DataTypes } = require("sequelize");
const { dbConnection } = require("./config");

const Worker = dbConnection.define("Worker", {
    //Model attributes are defined here
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

const syncModels = async () => {
    try {
        await Worker.sync();
        await Role.sync();
        await Register.sync();
        const roleCount = await Role.count();
        if (roleCount === 0) {
            await Role.bulkCreate([
                { name: "Trabajador" },
                { name: "Cliente" },
                { name: "Expositor" }
            ]);
        }
        console.log("All models were synchronized successfully.");
    } catch (e) {
        console.error(e);
    }
};

syncModels();

module.exports = { Worker, Role, Register };