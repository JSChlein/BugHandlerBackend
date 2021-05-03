const chalk = require("chalk");
const express = require("express");
const database = require("../controllers/dbcontext");
const router = express.Router();
const db = require("../controllers/dbController");




//---------------------------------------------------------/USER ROUTES--------------------------------------------------------------------------------

router.post('/auth', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    db.authenticateUser(email, password, (user) => {
        if (!user) {
            res.render("login", { msg: "Email or password is incorrect" });
        } else {
            req.session.isLoggedIn = true;
            req.session.email = email;
            req.session.docID = user.id;
            console.log(
                chalk.greenBright.inverse.bold(`${req.session.email} has just logged in!`)
            );
            res.redirect("/");
        }
        res.end();
    });

});

router.get('/login', (req, res) => {
    res.render("login", { pageTitle: "Login" });
})

router.get('/register', (req, res) => {
    res.render("register", { pageTitle: "Register" });
})

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    database.CreateUser(email, password, (user) => {
        res.redirect("/login")
    })

})



router.post('/login', (req, res) => {
    console.log(req.body);

})

module.exports = router;