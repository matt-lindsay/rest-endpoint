var express = require('express');
var bodyParser = require('body-parser');
var benNotifSlack = require('./slack.js');

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.status(200).send('Welcome to my endpoint.');
});

app.post('/', function (req, res, next) {
    var data = req.body;
    if (data) {
        res.status(200).json(data);
        benNotifSlack(data, 'good', 'Success');
    } else {
        res.status(400).send('Error.');
        benNotifSlack('No json.', 'warning', 'Bad Request');
    }
});

app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Running server on port ' + port);
});

