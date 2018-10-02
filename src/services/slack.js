const chalk = require('chalk');
const debug = require('debug')('slack');
const Slack = require('node-slackr');

module.exports = (message, color, title) => {
  const slack = new Slack(process.env.slack);
  const data = JSON.stringify(message);
  let messages = {};
  messages = {
    channel: '#devops_notifications',
    text: 'Rest Endpoint',
    username: 'Mogga Tron',
    icon_url: process.env.slackIcon,
    attachments: [
      {
        color,
        fields: [
          {
            title
          }
        ],
        text: data
      }
    ]
  };
  slack.notify(messages, (err, result) => {
    debug(`Slack errors ${chalk.red(err)}`);
    debug(`Slack notification ${chalk.green(result)}`);
  });
};
