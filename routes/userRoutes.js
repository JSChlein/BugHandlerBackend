const chalk = require("chalk");
const express = require("express");
const database = require("../controllers/dbcontext");
const router = express.Router();
const db = require("../controllers/dbController");
const Authencation = require("../controllers/Authentication")




//---------------------------------------------------------/USER ROUTES--------------------------------------------------------------------------------

router.post('/auth', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    database.AuthenticateUser(email, password, (user) => {
        if (!user) {
            console.log("NAY")
            res.render("login", { msg: "Email or password is incorrect" });
        } else {
            console.log("YAY")
            Authencation.SetSessionLoggedIn(req, user.id, email)
            console.log(
                chalk.greenBright.inverse.bold(`${req.session.email} has just logged in!`)
            );
            res.redirect("/report/allApps");
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
        res.redirect("/user/login")
    })

})

router.get('/logout', (req, res) => {
    Authencation.SetSessionLoggedOut(req);
    res.redirect("/")
})



router.post('/login', (req, res) => {
    console.log(req.body);

})

module.exports = router;