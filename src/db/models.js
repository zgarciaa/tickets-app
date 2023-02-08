const { DataTypes } = require("sequelize");
const { dbConnection } = require("./connection");

const Fingerprint = dbConnection.define("Fingerprint", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    template: {
        type: DataTypes.STRING
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownerType: {
        type: DataTypes.ENUM("operator", "user"),
        allowNull: false
    }
});

const Operator = dbConnection.define("Operator", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

const User = dbConnection.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Role = dbConnection.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const Stand = dbConnection.define("Stand", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numExpositors: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const Sale = dbConnection.define("Sale", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isStand: {
        type: DataTypes.BOOLEAN
    },
    numExpositors: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Operator.hasOne(Fingerprint, { foreignKey: "ownerId", scope: { ownerType: "operator" } }); // Each operator have one fingerprint
Fingerprint.belongsTo(Operator, { foreignKey: "ownerId" }); // Each fingerprint have one operator


User.hasOne(Fingerprint, { foreignKey: "ownerId", scope: { ownerType: "user" } }); // Each user have one fingerprint
Fingerprint.belongsTo(User, { foreignKey: "ownerId" }); // Each fingerprint have one user

User.belongsTo(Role, { foreignKey: "RoleId" }); // Each user have one role
Role.hasMany(User, { foreignKey: "RoleId" });   // Each role can have many users

module.exports = { Operator, Role, User, Fingerprint, Stand, Sale };