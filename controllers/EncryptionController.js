const bcrypt = require('bcrypt')

const salt = 10;



let EncryptionTool = {};


EncryptionTool.Encrypt = function(password, callback) {

    bcrypt.hash(password, salt)
        .then((encryptedPassword) => {
            console.log(encryptedPassword);
            callback(encryptedPassword);
        })
        .catch((err) => {
            return;
        });
}


EncryptionTool.Compare = function(password1, password2, callback) {
    console.log("COMPARE METHOD")
    bcrypt.compare(password1, password2).then((result) => {
            console.log("NO ERROR IN COMPARE METHOD")
            console.log(result);
            callback(result)
        })
        .catch((err) => {
            console.log(err)
            console.log("ERROR IN COMPARE METHOD")
            return;
        });

}








module.exports = EncryptionTool;