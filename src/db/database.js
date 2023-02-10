const { Operator, Role, User, Fingerprint, Stand, Sale } = require("./models");
const { createRoles, createStands, createTestOperators } = require("./functions");

const initDb = async () => {
    try {
        await Role.sync();
        await Operator.sync();
        await User.sync();
        await Fingerprint.sync();
        await Stand.sync();
        await Sale.sync();
        await createRoles();
        await createStands();
        await createTestOperators();
        console.log("All models were synchronized successfully.");
    } catch (e) {
        console.error(e);
    }
};

module.exports = { initDb };