const chalk = require("chalk");
const express = require("express");
const session = require("express-session");
const database = require("../controllers/dbcontext");
const router = express.Router();
const db = require("../controllers/dbController");
const util = require('util');


router.get("/all", (req, res) => {

    let AppId = req.query.appId;
    console.log(AppId);
    if (req.session.isLoggedIn) {
        console.log("Hej")
        database.GetAllReports((data) => {
            console.log("Hello");
            res.render("reports", { reports: data });
        })
    } else {
        res.redirect("/")
    }

})
const CreateReportAsync = util.promisify(database.CreateReport);

router.post("/new", (req, res) => {
    let data;
    data = req.body;
    setTimeout(function() {
        CreateReportAsync(data).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }, 10000)

})

router.get("/new", (req, res) => {
    res.render("ReportNew");
})

router.get("/info", (req, res) => {
    let docId = req.query.docId;
    database.GetReport(docId, (report) => {
        res.render("ReportInfo", { data: report });
    })
})

router.get("/applikation", (req, res) => {
    res.render("applikation");
})

router.post("/applikation/new", (req, res) => {

    let Title = req.body.Title;
    let Description = req.body.Description;
    let Image = req.body.EncodedImage;
    let ImageExtension = req.body.ImageExtension;

    database.CreateApplikation(Title, Description, Image, ImageExtension, (resp) => {
        console.log(resp)
        console.log("HEJ")
        let obj = {
            id: resp,
        }
        console.log(obj)
        res.json({ id: resp });
    })
})

router.get("/api", (req, res) => {
    console.log("Nu STARTER VI ET KALD PÅ API")
    let docId = req.query.docId;
    console.log("HER HAR VI DOC ID")
    console.log(docId)
    database.GetApplication(docId, (response) => {
        console.log("NU FIK VI SVAR")
        console.log(response)
        res.render("api", { data: response });
    })
})

router.get("/allApps", (req, res) => {
    database.GetAllApplications((data) => {
        res.render("AllApps", { data: data })
    })
})

router.delete("/allApps/delete", (req, res) => {
    let docId = req.body.DocId;
    console.log(docId);
    database.DeleteApplication(docId, (response) => {
        console.log(response);
        res.send(response);
    })


})










module.exports = router;