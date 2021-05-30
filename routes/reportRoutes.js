const chalk = require("chalk");
const express = require("express");
const session = require("express-session");
const Authencation = require("../controllers/Authentication")
const database = require("../controllers/dbcontext");
const router = express.Router();
const db = require("../controllers/dbController");
const misc = require("../controllers/misc");
const util = require('util');


router.get("/all", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        database.GetAllReports((data) => {
            res.render("reports", { reports: data });
        })
    } else {
        res.redirect("/")
    }
})

router.get("/app/reports", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        let AppId = req.query.appId;
        database.GetAllReportForApp(AppId, (data) => {

            res.render("reports", { reports: data });
        })
    } else {
        res.redirect("/")
    }
})

router.put("/app/reports/solved", (req, res) => {
    let docId = req.body.DocId;
    let solved = req.body.Solved;

    database.SetReportSolved(docId, solved, (cb) => {
        res.send(cb);
    })
})

const CreateReportAsync = util.promisify(database.CreateReport);

router.post("/new", (req, res) => {
    let data;
    data = req.body;
    uid = req.body.Uid

    database.AuthenticateApp(uid, (resp) => {
        if (resp) {
            console.log(`Application: ${resp.Title} with Uid: ${resp.Id} has received a new report.`)
            setTimeout(function() {
                CreateReportAsync(data).then(result => {}).catch(err => {
                    console.log(err);
                });
            }, 10000)


        } else {
            res.send("Application is not authenticated")
        }

    })

})

router.get("/new", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        res.render("ReportNew");
    } else {
        res.redirect("/")
    }

})

router.get("/info", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        let docId = req.query.docId;
        database.GetReport(docId, (report) => {
            res.render("ReportInfo", { data: report });
        })
    } else {
        res.redirect("/")
    }

})

router.get("/applikation", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        res.render("applikation");
    } else {
        res.redirect("/")
    }

})

router.post("/applikation/new", (req, res) => {

    let Title = req.body.Title;
    let Description = req.body.Description;
    let Image = req.body.EncodedImage;
    let ImageExtension = req.body.ImageExtension;

    database.CreateApplikation(Title, Description, Image, ImageExtension, (resp) => {
        let obj = {
            id: resp,
        }
        res.json({ id: resp });
    })
})

router.get("/api", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        let docId = req.query.docId;
        database.GetApplication(docId, (response) => {
            res.render("api", { data: response });
        })
    } else {
        res.redirect("/")
    }

})

router.get("/allApps", (req, res) => {
    if (Authencation.CheckLoggedIn(req)) {
        database.GetAllApplications((data) => {
            res.render("AllApps", { data: data })
        })
    } else {
        res.redirect("/")
    }

})

router.delete("/allApps/delete", (req, res) => {
    let docId = req.body.DocId;
    database.DeleteApplication(docId, (response) => {
        res.send(response);
    })


})










module.exports = router;