const { validateWebhook } = require("./src/validateWebhook")
const { replyDirectMessage } = require("./src/replyDirectMessage")
const { replyTweet, tweet } = require("./src/replyTweet")
const getData = require("./src/getData")

exports.handler = async ({ queryStringParameters, body }) => {
  try {
    if (queryStringParameters.crc_token) {
      const secret = process.env.TWITTER_CONSUMER_SECRET
      const crc = validateWebhook(queryStringParameters.crc_token, secret)
      return {
        body: JSON.stringify(crc),
        statusCode: 200,
      }
    }

    if (queryStringParameters.hola) {
      const poem = await getData({ range: "A1:A1000", verses: 4 })
      await tweet(poem)
      return {
        body: poem,
        statusCode: 200,
      }
    }

    const twitterEvent = JSON.parse(body, null, 2)

    if (twitterEvent.direct_message_events) {
      await replyDirectMessage(twitterEvent)
    }

    if (twitterEvent.tweet_create_events) {
      await replyTweet(twitterEvent)
    }

    return {
      body: "Hello world", // return something
      statusCode: 200,
    }
  } catch (e) {
    console.error(e)
  }
}
