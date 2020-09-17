const crypto = require("crypto")
const Twitter = require("twitter-lite")

function getClient(subdomain) {
  const client = new Twitter({
    subdomain: subdomain || "api",
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
  return client
}

function validateWebhook(token) {
  const responseToken = crypto
    .createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
    .update(token)
    .digest("base64")

  return responseToken
}

async function tweet(content) {
  const client = getClient()
  try {
    await client.post("statuses/update", content)
  } catch (e) {
    console.log(e)
  }
}

async function likeTweet(content) {
  const client = getClient()
  try {
    await client.post("favorites/create", content)
  } catch (e) {
    console.log(e)
  }
}

async function uploadImage(media) {
  const client = getClient("upload")
  try {
    const success = await client.post("media/upload", {
      media_data: media.toString("base64"),
    })
    return success
  } catch (e) {
    console.log(e)
  }
}

async function indicateTyping(recipient_id) {
  const client = getClient()
  try {
    await client.post("direct_messages/indicate_typing", {
      recipient_id,
    })
  } catch (e) {
    console.error(e)
  }
}

async function sendDirectMessage(text, recipient_id) {
  const client = getClient()
  try {
    await client.post("direct_messages/events/new", {
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id,
          },
          message_data: {
            text,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}

async function replyTweet(event) {
  await tweet(event)
}

async function replyDirectMessage(text, sender_id) {
  await indicateTyping(sender_id)
  await sendDirectMessage(text, sender_id)
}

module.exports = {
  validateWebhook,
  tweet,
  likeTweet,
  replyTweet,
  replyDirectMessage,
  uploadImage,
}
