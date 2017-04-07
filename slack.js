var Slack = require('node-slackr');

module.exports = function (message, color, title) {
    var slack = new Slack(process.env.slack);
    var data = JSON.stringify(message);
    var messages = {};
    messages = {
        channel: '#devops_notifications',
        text: "Rest Endpoint",
        username: 'Mogga Tron',
        icon_url: process.env.slackIcon,
        attachments: [
            {
                color: color,
                fields: [
                    {
                        title: title
                    }
                ],
                text: data
            }
        ]
    };
    slack.notify(messages, function (err, result) {
        console.log('>>> Slack errors: ' + err + '. ');
        console.log('>>> Slack notification: ' + result + '.');
    });
};