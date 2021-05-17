//står for alt grunt work til at hente data fra firebase.
const config = require("../config");
let database = {};



//----------------------------------GOOGLE CLOUD OPSÆTNING----------------------------------------------------//

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(config.firestoreServiceAccount),
});

//db ref
const db = admin.firestore();

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

database.CreateReport = function(req, callback) {

    let data = req;
    console.log(data);

    console.log(`Title: ${data.Title},
        Description: ${data.Description},
        TimeStamp: ${data.TimeStamp},
        EncodedImage: ${data.EncodedImage},
        ErrorCode: ${data.ErrorCode},
        ErrorMessage: ${data.ErrorMessage},
        FileName: ${data.FileName},
        ProgramName: ${data.ProgramName}`);



    callback(db.collection('Reports').doc().set({
        Title: data.Title,
        Description: data.Description,
        TimeStamp: data.TimeStamp,
        EncodedImage: data.EncodedImage,
        ErrorCode: data.ErrorCode,
        ErrorMessage: data.ErrorMessage,
        FileName: data.FileName,
        ProgramName: data.ProgramName
    }))
}

database.GetReport = function() {

}

database.DeleteReport = function() {

}

database.GetAllReports = function(callback) {
    db.collection("Reports")
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                return;
            } else {
                let userArray = [];
                let i = 0;
                snapshot.forEach((document) => {
                    const report = document.data();
                    let reportObj = {
                        Title: report.Title,
                        Description: report.Description,
                        phone: report.telefonnummer,
                        docId: snapshot.docs[i].id
                    };
                    if (userObj.username == "admin") {
                        i++;
                    } else {
                        userArray.push(userObj);
                        i++;
                    }
                });
                callback(userArray);
            }
        })
        .catch((err) => {
            return;
        });
}



module.exports = database;