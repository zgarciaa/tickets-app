const { AES, enc } = require("crypto-js");
require("dotenv").config();

const encryptData = ({ username, password }, decrypt = false) => {
    const key = enc.Base64.parse(process.env.ENC_KEY);
    const iv = enc.Base64.parse(process.env.ENC_IV);
    if (!decrypt) {
        return {
            username: AES.encrypt(username, key, { iv: iv }).toString(),
            password: AES.encrypt(password, key, { iv: iv }).toString()
        };
    }
    return {
        username: AES.decrypt(username, key, { iv: iv }).toString(enc.Utf8),
        password: AES.decrypt(password, key, { iv: iv }).toString(enc.Utf8)
    };
};

module.exports = { encryptData };