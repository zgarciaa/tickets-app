const { Operator, Role, User, Fingerprint, Stand, Sale } = require("./models");
const { dbConnection } = require("./connection");
const { Stats } = require("original-fs");

const createFingerprint = async (fingerprint) => {
    let newFingerprint;
    try {
        await dbConnection.transaction(async (t) => {
            newFingerprint = await Fingerprint.create(fingerprint, { transaction: t });
            console.log("Fingerprint created, ID:", newFingerprint.id);
        });
        return newFingerprint.id;
    } catch (e) {
        console.error(e);
    }
};

const createOperator = async (operator) => {
    let newOperator;
    try {
        await dbConnection.transaction(async (t) => {
            const _operator = await Operator.findOne({
                where: {
                    username: operator.username
                }
            });
            if (!_operator) {
                newOperator = await Operator.create(operator, { transaction: t });
                //await createFingerprint("operator", newOperator.id);
                console.log("Operator created, ID:", newOperator.id);
            }
        });
        return newOperator.id;
    } catch (e) {
        console.error(e);
    }
};

const newOperator = async (template) => {
    try {
        const operatorId = await createOperator({
            username: "username_default1",
            password: "password_default1"
        });
        const fingerprintId = await createFingerprint({
            template: template,
            ownerId: operatorId,
            ownerType: "operator"
        });
        console.log("Operator created: ", operatorId, fingerprintId);
    } catch (e) {
        console.error(e);
    }
};

const createRoles = async () => {
    try {
        const roleCount = await Role.count();
        if (roleCount === 0) {
            await dbConnection.transaction(async (t) => {
                await Role.bulkCreate([
                    { name: "Expositor" },
                    { name: "General" },
                    { name: "Cortesia" }
                ], { transaction: t });
            });
        }
    } catch (e) {
        console.error(e);
    }
};

const createStands = async () => {
    try {
        const standCount = await Stand.count();
        if (standCount === 0) {
            await dbConnection.transaction(async (t) => {
                await Stand.bulkCreate([
                    { name: "Stand1", isAvailable: true, price: 10000, numExpositors: 1 },
                    { name: "Stand2", isAvailable: true, price: 20000, numExpositors: 2 },
                    { name: "Stand3", isAvailable: true, price: 30000, numExpositors: 3 },
                    { name: "Stand4", isAvailable: true, price: 40000, numExpositors: 4 },
                ], { transaction: t });
            });
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports = { createRoles, createStands, newOperator };

