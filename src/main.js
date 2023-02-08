const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { encryptData } = require("./utils/crypto");
const { syncModels } = require("./db/sync");
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
    await syncModels();
    createMainWindow();
    //Test create worker
    await db.newOperator("template_default1");
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

    ipcMain.on("new-operator", async (event, operator) => {
        await db.newOperator(operator);
    });
});
