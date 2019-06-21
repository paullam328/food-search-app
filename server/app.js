const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const allowedOrigins = process.env.allowedOrigins.split(',');
app.use(cors({
    origin: (origin, callback) => {
        console.log("testing from server1");
        if (!origin) return callback(null, true);
        console.log(origin);
        console.log(allowedOrigins);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site doesn't allow access from the specified origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

//Validation rules start:
const valFuntions = require('./validators/validate');

//Validation rules end:



//app Routes
//create application/json parser
const jsonParser = bodyParser.json();
/*app.post('/signup', jsonParser, (req, res) => {
    if (valFuntions.checkInputDataNull(req, res)) return null;
    if (valFuntions.checkInputDataQuality(req, res)) return null;

    var dbFunctions = require('./models/connector');
    dbFunctions.createUser(req, res);
});

app.use('/', (req, res) => res.send("Welcome to Food Search App User!"));
app.listen(process.env.PORT, () => console.log('Server is ready on localhost: ' + process.env.PORT));*/

app.post('/post', jsonParser, (req, res) => {
    if (valFuntions.checkInputDataNULL(req, res)) return null;
    if (valFuntions.checkInputDataQuality(req, res)) return null;

    var dbFunctions = require('./models/connector');
    dbFunctions.createKeyword(req, res, 'POST');
});

app.get('/get', jsonParser, (req, res) => {
    if (valFuntions.checkInputDataNULL(req, res)) return null;
    if (valFuntions.checkInputDataQuality(req, res)) return null;

    var dbFunctions = require('./models/connector');
    dbFunctions.createKeyword(req, res, 'GET');
});

app.delete('/delete', jsonParser, (req, res) => {
    if (valFuntions.checkInputDataNULL(req, res)) return null;
    if (valFuntions.checkInputDataQuality(req, res)) return null;

    var dbFunctions = require('./models/connector');
    dbFunctions.createKeyword(req, res, 'DELETE');
});

app.put('/put', jsonParser, (req, res) => {
    if (valFuntions.checkInputDataNULL(req, res)) return null;
    if (valFuntions.checkInputDataQuality(req, res)) return null;

    var dbFunctions = require('./models/connector');
    dbFunctions.createKeyword(req, res, 'PUT');
});



app.use('/', (req, res) => res.send("Welcome to Food Search App User!"));
app.listen(process.env.PORT, () => console.log('Server is ready on localhost: ' + process.env.PORT));

