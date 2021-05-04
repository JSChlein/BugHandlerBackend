const dbContext = require("./dbcontext").default;


let controller = {};


controller.authenticateUser = function(email, password, callback) {
    dbContext.AuthenticateUser(email, password, (cb) => {
        callback(cb);
    })
}

controller.createUser = function(email, password, callback) {
    dbContext.CreateUser(email, password, (cb) => {
        callback(cb);
    })
}



module.exports = controller;