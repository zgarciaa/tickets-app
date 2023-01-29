const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const crypto = require("./utils/crypto");
const { initDb } = require("./utils/db/database");

const createMainWindow = () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        }
    });
    window.loadFile(path.join(__dirname, "./ui/login/index.html"));
    window.webContents.openDevTools();
};

app.whenReady().then(async () => {
    createMainWindow();
    // Initialize database
    await initDb();
    // Create New Window
    ipcMain.on("new-window", (event, file) => {
        event.preventDefault();
        const newWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
            }
        });
        newWindow.loadFile(file);
    });

    ipcMain.on("encrypt-data", (event, data, decrypt) => {
        //event.preventDefault();
        crypto.encryptData(data, decrypt);
    });
    ipcMain.on("decrypt-data", (event, data, decrypt) => {
        //event.preventDefault();
        crypto.encryptData(data, decrypt);
    });
});
