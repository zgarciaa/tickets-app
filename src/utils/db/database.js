const { Worker, Role, Register, createRoles } = require("./models");

const syncModels = async () => {
    try {
        await Role.sync();
        await Worker.sync();
        await Register.sync();
        await createRoles();
        console.log("All models were synchronized successfully.");
    } catch (e) {
        console.error(e);
    }
};

module.exports = { syncModels };