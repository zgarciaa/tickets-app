const { contextBridge } = require("electron");
const { AES, enc } = require("crypto-js");

contextBridge.exposeInMainWorld("cryptography", {
    encrypt: (originalData) => {
        const data = {
            username: AES.encrypt(originalData.username, "enc_key").toString(),
            password: AES.encrypt(originalData.password, "enc_key").toString()
        };
        return data;
    },
    decrypt: (encryptedData) => {
        const bUsername = AES.decrypt(encryptedData.username, "enc_key");
        const bPassword = AES.decrypt(encryptedData.password, "enc_key");
        const data = {
            username: bUsername.toString(enc.Utf8),
            password: bPassword.toString(enc.Utf8)
        };
        return data;
    }
})
