require("dotenv").config()
const { Autohook } = require("twitter-autohook")
const ngrok = require("ngrok")

const config = {
  token: process.env.TWITTER_ACCESS_TOKEN,
  token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  env: process.env.TWITTER_WEBHOOK_ENV,
}

async function setWebhook() {
  try {
    let url
    if (process.argv[2]) {
      url = process.argv[2]
    } else {
      url = await ngrok.connect(8888)
    }
    const webhookURL = `${url}/.netlify/functions/twitter`
    const webhook = new Autohook(config)
    await webhook.removeWebhooks()
    await webhook.start(webhookURL)
    await webhook.subscribe({
      oauth_token: config.token,
      oauth_token_secret: config.token_secret,
    })
  } catch (e) {
    throw e
  }
}

setWebhook()
