var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let database = {};

//------------------------------------------------------DATABASE METHODS---------------------------------------------------------------

database.AuthenticateUser = function(email, password, callback) {
    console.log(email);
    console.log(password);
    db.collection("Accounts")
        .where("email", "==", email.toLowerCase())
        .where("password", "==", password)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                callback(false);
            } else {
                snapshot.forEach((document) => {
                    const user = document.data();
                    user.id = document.id;
                    callback(user);
                });
            }
        })
        .catch((err) => {
            return;
        });
}

database.CreateUser = function(email, password, callback) {
    callback(db.collection('Accounts').doc().set({
        email: email.toLowerCase(),
        password: password
    }))
}

database.DeleteUser = function(username, password) {

}

database.GetUser = function(username, password) {

}

database.CreateReport = function() {

}

database.GetReport = function() {

}

database.DeleteReport = function() {

}

database.GetAllReports = function() {

}



module.exports = database;