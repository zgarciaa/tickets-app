const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");

/* 
contextBridge.exposeInMainWorld("cryptography", {
    encryptData: (data, decrypt) => {
        ipcRenderer.send("encrypt-data", data, decrypt);
    }
});
*/

/* 
contextBridge.exposeInMainWorld("newWindow", {
    userRegister: () => {
        ipcRenderer.send("new-window", path.join(__dirname, "./ui/userRegister/index.html"));
    }
});
*/

