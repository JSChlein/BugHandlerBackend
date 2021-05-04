const chalk = require("chalk");
const express = require("express");
const session = require("express-session");
const database = require("../controllers/dbcontext");
const router = express.Router();
const db = require("../controllers/dbController");


router.get("/all", (req, res) => {
    if (req.session.isLoggedIn) {
        database.GetAllReports((data) => {
            res.render("reports", { reports: data });
        })
    } else {
        res.redirect("/")
    }

})









module.exports = router;