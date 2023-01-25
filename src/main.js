const { app, BrowserWindow } = require("electron");
const path = require("path");

const createMainWindow = () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        }
    });

    window.loadFile("src/index.html")
}

app.whenReady().then(() => {
    createMainWindow();
});
