const { textBack, tweetBack, validateWebhook } = require("./src")

exports.handler = async ({ queryStringParameters, body }) => {
  try {
    if (queryStringParameters.crc_token) {
      const crc = validateWebhook(
        queryStringParameters.crc_token,
        process.env.TWITTER_CONSUMER_SECRET
      )
      return {
        body: JSON.stringify(crc),
        statusCode: 200,
      }
    }

    const twitterEvent = JSON.parse(body, null, 2)
    if (twitterEvent.direct_message_events) {
      await textBack(twitterEvent)
    }
    if (twitterEvent.tweet_create_events) {
      await tweetBack(twitterEvent)
    }

    return {
      body: "Hello world", // return something
      statusCode: 200,
    }
  } catch (e) {
    console.error(e)
  }
}
