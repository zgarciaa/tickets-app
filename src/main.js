const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { encryptData } = require("./utils/crypto");
const { initDb } = require("./db/database");
const db = require("./db/functions");

const createMainWindow = () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    window.loadFile(path.join(__dirname, "./ui/login/login.html"));
    window.webContents.openDevTools();
};

app.whenReady().then(async () => {
    await initDb();
    createMainWindow();
    ipcMain.on("new-window", (event, file) => {
        event.preventDefault();
        const newWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        newWindow.loadFile(file);
    });
    ipcMain.on("new-operator", async (event, operator, template) => {
        //await db.newOperator(operator, template);
    });
    ipcMain.on("new-user", async (event, user) => {
        let BLOB = parseInt(Math.floor(Math.random() * 256).toString(2).padStart(8, '0'), 2);
        console.log(BLOB);
        await db.newUser(user, BLOB);
    });
    ipcMain.on("new-sale", async (event, sale) => {
        await db.newSale(sale);
    })
});
