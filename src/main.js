const { app, BrowserWindow, Menu, ipcMain } = require("electron");
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
    window.loadFile(path.join(__dirname, "./ui/login/index.html"));
    window.webContents.openDevTools();

    /*
    loginWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url === "src/ui/userRegister/index.html") {
            return {
                action: 'allow',
                overrideBrowserWindowOptions: {
                    webPreferences: {
                        preload: path.join(__dirname, "preload.js"),
                        nodeIntegration: true
                    }
                }
            };
        }
        return { action: 'deny' }
    });
    */
};

// Create user register window
const createUserRegisterWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        }
    });
    window.loadFile(path.join(__dirname, "./ui/userRegister/index.html"));
};

app.whenReady().then(() => {
    createMainWindow();

    // Menu Template
    const menuTemplate = [
        {
            label: "Archivo",
            submenu: [
                {
                    label: "Ayuda",
                    click: () => console.log("Menu Ayuda")
                },
                { type: "separator" },
                {
                    label: "Salir",
                    click: () => app.quit(),
                    accelerator: "Ctrl+W"
                }
            ]
        },
        {
            label: "Crear Usuario",
            click: createUserRegisterWindow
        }
    ];

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("new-window", (event, arg) => {
        event.preventDefault();
        const newWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true
            }
        });
        newWindow.loadFile(arg);
    })
});
