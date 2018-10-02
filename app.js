const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const slack = require('./src/services/slack.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my endpoint. It will return your http request for examination via Slack.');
});

app.post('/', (req, res) => {
  const data = req.body;
  if (data) {
    res.status(200).json(data);
    slack(data, 'good', 'Success');
  } else {
    res.status(400).send('Error.');
    slack('No json.', 'warning', 'Bad Request');
  }
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  debug(`Listening at port ${chalk.green(port)}`);
});
