const RequestPromise = require("request-promise");
const { IncomingWebhook } = require("@slack/webhook");

class Slack {
    constructor(slackUrl) {
        this.slackUrl = slackUrl;
        this.canSend = true;
        this.slack = new IncomingWebhook(slackUrl);
    }

    sendObject(object, ats) {
        this.send(object, ats);
    }

    send(object, ats = []) {
        if (!this.canSend) {
            return;
        }
        let username = "Okx-Perpetual";
        if (object.market) {
            username = object.market + "-Perpetual";
        }
        let data = {
            channel: "apro-oracles-test",
            text: `<@U04GZSTQWDS> env: ${"checking"}, content: ${JSON.stringify(object)}`,
            username: username,
            link_names: true
        };
        this.slack.send(data).catch(error => console.error(error));
    }
}

module.exports = new Slack(
    "https://hooks.slack.com/services/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"
);
