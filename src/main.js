const { app, BrowserWindow } = require("electron");
const path = require("path");

const createMainWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile("src/index.html")
}

app.whenReady().then(() => {
    createMainWindow();
});