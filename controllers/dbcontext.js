import { initializeApp, credential as _credential, firestore } from "firebase-admin";

import serviceAccount from "../serviceAccountKey.json";

initializeApp({
    credential: _credential.cert(serviceAccount)
});

const db = firestore();

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

database.DeleteUser = function(docId, callback) {
    db.collection("Accounts").doc(docId).delete().then(function() {
        callback("User has been deleted")
    }).catch(function(error) {
        console.log(error)
    })
}

database.GetUser = function(username, password) {

}

database.CreateReport = function() {

}

database.GetReport = function() {

}

database.DeleteReport = function() {

}

database.GetAllReports = function(callback) {
    callback("hej")
}



export default database;