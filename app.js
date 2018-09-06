'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const slack = require('./slack.js');

let app = express();

let port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.status(200).send('Welcome to my endpoint. It will return your http request for examination via Slack.');
});

app.post('/', function (req, res, next) {
    var data = req.body;
    if (data) {
        res.status(200).json(data);
        slack(data, 'good', 'Success');
    } else {
        res.status(400).send('Error.');
        slack('No json.', 'warning', 'Bad Request');
    }
});

app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Running server on port ' + port);
});

