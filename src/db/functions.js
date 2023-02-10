const { Operator, Role, User, Fingerprint, Stand, Sale } = require("./models");
const { dbConnection } = require("./connection");

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

const createUser = async (user) => {
    let newUser;
    try {
        await dbConnection.transaction(async (t) => {
            const _user = await User.findOne({
                where: {
                    document: user.document
                }
            });
            if (!_user) {
                newUser = await User.create(user, { transaction: t });
                console.log("User created, ID:", newUser.id);
            }
        });
        return newUser.id;
    } catch (e) {
        console.error(e);
    }
};

const newOperator = async (operator, template) => {
    try {
        const operatorId = await createOperator(operator);
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

const newUser = async (user, template) => {
    try {
        const userId = await createUser(user);
        const fingerprintId = await createFingerprint({
            template: template,
            ownerId: userId,
            ownerType: "user"
        });
        console.log("User created: ", userId, fingerprintId);
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
            console.log("Test Roles added succesfully");
        }
    } catch (e) {
        console.error(e);
    }
};

const createTestOperators = async () => {
    try {
        await newOperator({
            username: "username_1",
            password: "password_1"
        }, 0x01);
        await newOperator({
            username: "username_2",
            password: "password_2"
        }, 0x02);
        await newOperator({
            username: "username_3",
            password: "password_3"
        }, 0x03);
        await newOperator({
            username: "username_4",
            password: "password_4"
        }, 0x04);

        console.log("Test Operators added succesfully");
    } catch (e) {
        console.error(e);
    }
};

const newSale = async (sale) => {
    let newSale;
    try {
        await dbConnection.transaction(async (t) => {
            newSale = await Sale.create(sale, { transaction: t });
            console.log("Sale created, ID:", newSale.id);
        });
        return newSale.id;
    } catch (e) {
        console.error(e);
    }
};

module.exports = { createRoles, createStands, newOperator, newUser, createTestOperators, newSale };

