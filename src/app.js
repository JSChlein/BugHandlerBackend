const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combine'));
app.use(bodyParser.json());
app.use(cors());

/*REQUEST TYPES:
GET
POST
PUT
PATCH
DELETE
*/

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send({
        message: `Hello ${req.body.email}! You are now registered!`
    })
})

app.listen(process.env.PORT || 8081)