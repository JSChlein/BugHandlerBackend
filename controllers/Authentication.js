const express = require("express");
const session = require("express-session");

let Authentication = {};


Authentication.CheckLoggedIn = function(req) {

    if (req.session.isLoggedIn) {
        return true;
    } else {
        return false;
    }
}

Authentication.SetSessionLoggedIn = function(req, docId, email) {
    req.session.isLoggedIn = true;
    req.session.email = email;
    req.session.docID = docId;
}

Authentication.SetSessionLoggedOut = function(req) {
    req.session.isLoggedIn = false;
    req.session.email = null;
    req.session.docID = null;
}





module.exports = Authentication;