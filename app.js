const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config')
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

session = require("express-session");

app.use(
    session({
        secret: config.sessionSecret,
    })
)

app.use(express.static("assets"));

app.set("view engine", "pug");

//Adgang til session i PUG filerne.
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
})

//app.use(express.static("./"));


//----------------------------------------------------------SERVER ROUTES-------------------------------------------------------------------------------//

app.get('', (req, res) => {
    res.render("index", {
        pageTitle: "Front Page"
    });
})

const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);

app.listen(process.env.PORT || 8081)