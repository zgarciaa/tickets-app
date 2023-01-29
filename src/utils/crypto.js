const { AES, enc } = require("crypto-js");

const encryptData = ({ username, password }, decrypt) => {
    if (!decrypt) {
        const data = {
            username: AES.encrypt(username, "enc_key").toString(),
            password: AES.encrypt(password, "enc_key").toString()
        };
        console.log("Encrypt", data);
        return data;
    }
    const data = {
        username: AES.decrypt(username, "enc_key").toString(enc.Utf8),
        password: AES.decrypt(password, "enc_key").toString(enc.Utf8)
    };
    console.log("Decrypt", data);
    return data;
}

module.exports = { encryptData };