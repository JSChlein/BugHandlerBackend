//står for alt grunt work til at hente data fra firebase.
const config = require("../config");
const encryptionTool = require("../controllers/EncryptionController")
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
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
    db.collection("Accounts")
        .where("email", "==", email.toLowerCase())
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                callback(false);
            } else {
                snapshot.forEach((document) => {
                    const user = document.data();
                    console.log(user);
                    encryptionTool.Compare(password, user.password, (res) => {
                        if (res) {
                            user.id = document.id;
                            callback(user);
                        } else {
                            callback(false)
                        }
                        console.log(res);
                    })
                });
            }
        })
        .catch((err) => {
            return;
        });
}

database.CreateUser = function(email, password, callback) {
    encryptionTool.Encrypt(password, (encryptedPassword) => {
        callback(db.collection('Accounts').doc().set({
            email: email.toLowerCase(),
            password: encryptedPassword
        }))
    });

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

database.CreateReport = async function(req, callback) {

    let data = await req;

    console.log(data);
    if (!data.Title) {
        data.Title = "N/A"
    }
    if (!data.Description) {
        data.Description = "N/A"
    }
    if (!data.TimeStamp) {
        data.TimeStamp = "N/A"
    }
    if (!data.EncodedImage) {
        data.EncodedImage = ReadPlaceHolderEncoding();
    }
    if (!data.ErrorCode) {
        data.ErrorCode = "N/A"
    }
    if (!data.ErrorMessage) {
        data.ErrorMessage = "N/A"
    }
    if (!data.FileName) {
        data.FileName = "N/A"
    }
    if (!data.ImageExtension) {
        data.ImageExtension = ".png"
    }
    if (!data.Uid) {
        data.Uid = "N/A"
    }
    if (!data.ProgramName) {
        data.ProgramName = "N/A"
    }

    console.log(`Title: ${data.Title},
        Description: ${data.Description},
        TimeStamp: ${data.TimeStamp},
        EncodedImage: ${data.EncodedImage},
        ErrorCode: ${data.ErrorCode},
        ErrorMessage: ${data.ErrorMessage},
        FileName: ${data.FileName},
        ImageExtension: ${data.ImageExtension},
        Uid: ${data.Uid},
        ProgramName: ${data.ProgramName}`);



    callback(db.collection('Reports').doc().set({
        Title: data.Title,
        Description: data.Description,
        TimeStamp: data.TimeStamp,
        EncodedImage: data.EncodedImage,
        ErrorCode: data.ErrorCode,
        ErrorMessage: data.ErrorMessage,
        FileName: data.FileName,
        ProgramName: data.ProgramName,
        Uid: data.Uid,
        ImageExtension: data.ImageExtension
    }))
}

database.GetReport = function(docId, callback) {
    db.collection("Reports")
        .doc(docId)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                callback("false")
            } else {
                const report = snapshot.data();
                let reportObj = {
                    Title: report.Title,
                    Description: report.Description,
                    TimeStamp: report.TimeStamp,
                    EncodedImage: report.EncodedImage,
                    ErrorCode: report.ErrorCode,
                    ErrorMessage: report.ErrorMessage,
                    FileName: report.FileName,
                    ProgramName: report.ProgramName,
                    ImageExtension: report.ImageExtension,
                    docId: docId
                };
                callback(reportObj)
            }
        }).catch((err) => {
            return;
        })
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
                let reportArray = [];
                let i = 0;
                snapshot.forEach((document) => {
                    const report = document.data();
                    let reportObj = {
                        Title: report.Title,
                        Description: report.Description,
                        TimeStamp: report.TimeStamp,
                        EncodedImage: report.EncodedImage,
                        ErrorCode: report.ErrorCode,
                        ErrorMessage: report.ErrorMessage,
                        FileName: report.FileName,
                        ProgramName: report.ProgramName,
                        ImageExtension: report.ImageExtension,
                        docId: snapshot.docs[i].id
                    };
                    reportArray.push(reportObj);
                    console.log(i);
                    i++;
                });
                callback(reportArray);
            }
        })
        .catch((err) => {
            return;
        });
}

database.GetAllReportForApp = function(appId, callback) {
    db.collection("Reports")
        .where("Uid", "==", appId)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                return;
            } else {
                let reportArray = [];
                let i = 0;
                snapshot.forEach((document) => {
                    const report = document.data();
                    let reportObj = {
                        Title: report.Title,
                        Description: report.Description,
                        TimeStamp: report.TimeStamp,
                        EncodedImage: report.EncodedImage,
                        ErrorCode: report.ErrorCode,
                        ErrorMessage: report.ErrorMessage,
                        FileName: report.FileName,
                        ProgramName: report.ProgramName,
                        ImageExtension: report.ImageExtension,
                        AppId: report.Uid,
                        docId: snapshot.docs[i].id
                    };
                    reportArray.push(reportObj);
                    console.log(i);
                    i++;
                });
                callback(reportArray);
            }
        })
        .catch((err) => {
            return;
        });
}

database.CreateApplikation = function(title, description, encodedImage, imageExtension, callback) {

    let id = uuidv4();
    let apiObj = {
        Title: title,
        Description: description,
        EncodedImage: encodedImage,
        ImageExtension: imageExtension,
        Id: id
    };
    let obj = db.collection('Applications').doc()
    obj.set({
        Title: title,
        Description: description,
        EncodedImage: encodedImage,
        ImageExtension: imageExtension,
        Id: id
    }).then(res => {
        callback(obj.id);

    });
}


database.GetApplication = function(docId, callback) {
    console.log("Vi starter vores database")
    db.collection("Applications")
        .doc(docId)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                callback("false")
            } else {
                console.log("har fundet doc")
                callback(snapshot.data());
            }
        }).catch((err) => {
            return;
        })
}

database.GetAllApplications = function(callback) {
    db.collection("Applications")
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                return;
            } else {
                let appArray = [];
                let i = 0;
                snapshot.forEach((document) => {
                    const application = document.data();
                    let appObj = {
                        Title: application.Title,
                        Description: application.Description,
                        EncodedImage: application.EncodedImage,
                        ImageExtension: application.ImageExtension,
                        Id: application.Id,
                        docId: snapshot.docs[i].id
                    };
                    appArray.push(appObj);
                    console.log(i);
                    i++;
                });
                callback(appArray);
            }
        })
        .catch((err) => {
            return;
        });
}

database.DeleteApplication = function(docId, callback) {
    db.collection("Applications")
        .doc(docId)
        .delete()
        .then(res => callback(res))
        .catch((err) => {
            console.log(err);
        });
}

database.AuthenticateApp = function(Uid, callback) {
    db.collection("Applications")
        .where("Id", "==", Uid)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                callback(false);
            } else {
                snapshot.forEach((document) => {
                    const app = document.data();
                    console.log(app);
                    callback(app)

                });
            }
        })
        .catch((err) => {
            return;
        });
}

function ReadPlaceHolderEncoding() {
    let encoding = "";

    fs.readFileSync("../misc/placeholder.txt", function(err, data) {
        if (err) {
            throw err;
        }
        return data;

    });
}


module.exports = database;