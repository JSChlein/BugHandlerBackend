const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config')
const morgan = require('morgan');
const pug = require("pug");

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }))
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

const reportRouter = require("./routes/reportRoutes");
app.use("/report", reportRouter);

const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);

app.listen(process.env.PORT || 8081)