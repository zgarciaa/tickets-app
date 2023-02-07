const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const crypto = require("./utils/crypto");
const { syncModels } = require("./utils/db/database");

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
    window.loadFile(path.join(__dirname, "./ui/login/index.html"));
    window.webContents.openDevTools();
};

app.whenReady().then(async () => {
    await syncModels();
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

    ipcMain.on("new-worker", (event, worker) => {
        const _worker = crypto.encryptData(worker);
        console.log(_worker);
        //db.insertWorker(_worker);
    });
});
