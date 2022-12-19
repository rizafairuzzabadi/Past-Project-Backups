const CryptoJS = require("crypto-js");

const PASSWORD_HASH="de7cc29eb493f03c915a960b195ba9194f7a49c35d846422741176c6a9e64f75";

const passwordToHash = (password) => {
    const hashKey = CryptoJS.HmacSHA1(password, PASSWORD_HASH);
    return CryptoJS.HmacSHA256(password, hashKey).toString();
}

module.exports = {
    passwordToHash,
}