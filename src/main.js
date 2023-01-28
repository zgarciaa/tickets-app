const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { encryptData, decryptData } = require("./utils/crypto");
const { getConnection, createUsersTable } = require("./utils/database");

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

app.whenReady().then(() => {
    createMainWindow();
    createUsersTable();
    
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

    ipcMain.on("encrypt-data", (event, data) => {
        //event.preventDefault();
        encryptData(data);
    });
    ipcMain.on("decrypt-data", (event, data) => {
        //event.preventDefault();
        decryptData(data);
    });
});
