const { AES, enc } = require("crypto-js");

const encryptData = ({ username, password }) => {
    const _data = {
        username: AES.encrypt(username, "enc_key").toString(),
        password: AES.encrypt(password, "enc_key").toString()
    };
    return _data;
};

const decryptData = ({ username, password }) => {
    const bUsername = AES.decrypt(username, "enc_key");
    const bPassword = AES.decrypt(password, "enc_key");
    const _data = {
        username: bUsername.toString(enc.Utf8),
        password: bPassword.toString(enc.Utf8)
    };
    return _data;
};

module.exports = { encryptData, decryptData };