const { Worker, Role, Register } = require("./models");

const createWorker = async (worker) => {
    try {
        const newWorker = await Worker.create(worker);
        console.log("Worker auto-generated ID:", newWorker.id);
    } catch (e) {
        console.error(e);
    }
};

const createRegister = async (register) => {
    try {
        const newRegister = await Register.create(register);
        console.log("Worker auto-generated ID:", newRegister.id);
    } catch (e) {
        console.error(e);
    }
};

module.exports = { createWorker, createRegister };

