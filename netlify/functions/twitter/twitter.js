const { validateWebhook } = require("./src/twitter");
const onDirectMessage = require("./src/onDirectMessage");
const onTweet = require("./src/onTweet");
const onTrigger = require("./src/onTrigger");

exports.handler = async ({ queryStringParameters, body }) => {
  try {
    if (queryStringParameters.crc_token) {
      const responseToken = validateWebhook(queryStringParameters.crc_token);
      return {
        body: JSON.stringify({ response_token: `sha256=${responseToken}` }),
        statusCode: 200,
      };
    }
    if (queryStringParameters.trigger) {
      await onTrigger();
      return {
        body: "OK", // return something
        statusCode: 200,
      };
    }
    const { direct_message_events, tweet_create_events } = JSON.parse(body);
    if (direct_message_events) {
      await onDirectMessage(direct_message_events);
    }
    if (tweet_create_events) {
      await onTweet(tweet_create_events);
    }
    return {
      body: "OK", // return something
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
  }
};
