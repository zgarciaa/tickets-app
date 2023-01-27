const { contextBridge, ipcRenderer } = require("electron");
const { AES, enc } = require("crypto-js");
const path = require("path");

contextBridge.exposeInMainWorld("cryptography", {
    encrypt: (data) => {
        const _data = {
            username: AES.encrypt(data.username, "enc_key").toString(),
            password: AES.encrypt(data.password, "enc_key").toString()
        };
        return _data;
    },
    decrypt: (data) => {
        const bUsername = AES.decrypt(data.username, "enc_key");
        const bPassword = AES.decrypt(data.password, "enc_key");
        const _data = {
            username: bUsername.toString(enc.Utf8),
            password: bPassword.toString(enc.Utf8)
        };
        return _data;
    }
});

contextBridge.exposeInMainWorld("newWindow", {
    userRegister: () => {
        ipcRenderer.send("new-window", path.join(__dirname, "./ui/login/index.html"));
        console.log("New Window");
    }
})

