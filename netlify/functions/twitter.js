const { sheetpoetry } = require("../../src/utils");
const { createMeme } = require("../../src/utils/createMeme");
const { getMeaning } = require("../../src/utils/wit");
const { tweet, likeTweet, replyDirectMessage, uploadImage, validateWebhook } = require("../../src/utils/twitter");

async function handleDirectMessageEvents(event) {
  const message = event.direct_message_events.shift(); // we extract the first message
  if (typeof message === "undefined") return; // we check that the message is valid
  if (typeof message.message_create === "undefined") return; // and that the message_create object is valid
  if (message.message_create.sender_id === process.env.TWITTER_ACCESS_TOKEN.replace(/-.*/, "")) return; // and that the sender is not the bot
  const intent = await getMeaning(message.message_create.message_data.text.replace("@cumatron_win", "")); // we get the meaning of the message
  if (intent) {
    const sheetpoem = await sheetpoetry(intent);
    await replyDirectMessage(sheetpoem, message.message_create.sender_id); // and we reply to the sender
  } else {
    await replyDirectMessage("🤖💥🔥🔥🔥", message.message_create.sender_id); // the bot didn't understand
  }
}

async function handleTweetCreateEvents(event) {
  const message = event.tweet_create_events.shift();
  if (typeof message === "undefined") return; // we check that the message is valid
  if (message.user.id_str === process.env.TWITTER_ACCESS_TOKEN.replace(/-.*/, "")) return; // and that the sender is not the bot

  if (message.retweeted_status) {
    await likeTweet({ id: message.id_str });
    return;
  }

  const { media } = message.entities;
  if (media) {
    const { media_url_https } = media.find((item) => item.type === "photo");
    if (media_url_https) {
      const sheetpoem = await sheetpoetry("poem");
      const meme = await createMeme(media_url_https, sheetpoem);
      const { media_id_string } = await uploadImage({ media_data: meme.toString("base64") });
      await tweet({
        status: sheetpoem,
        in_reply_to_status_id: message.id_str,
        auto_populate_reply_metadata: true,
        media_ids: media_id_string,
      });
    }
    return;
  }

  const intent = await getMeaning(message.text); // we get the meaning of the message
  if (intent) {
    const sheetpoem = await sheetpoetry(intent);
    await tweet({ status: sheetpoem, in_reply_to_status_id: message.id_str, auto_populate_reply_metadata: true });
  } else {
    await tweet({ status: "🤖💥🔥🔥🔥", in_reply_to_status_id: message.id_str, auto_populate_reply_metadata: true });
  }
}

exports.handler = async (req) => {
  // if a crc_token is present, we validate the webhook
  if (req.queryStringParameters.crc_token) {
    const token = validateWebhook(req.queryStringParameters.crc_token);
    // and return the response token to Twitter
    return {
      body: JSON.stringify({ response_token: `sha256=${token}` }),
      statusCode: 200,
    };
  }

  // we parse the body of the request
  const event = JSON.parse(req.body);

  // do nothing if the event is not a tweet or a direct message event
  if (event.direct_message_mark_read_events || event.direct_message_indicate_typing_events || event.favorite_events) {
    return;
  }

  // we check that the event is a tweet event
  if (event.tweet_create_events) {
    handleTweetCreateEvents(event);
  }

  // we check that the event is a direct message event
  if (event.direct_message_events) {
    handleDirectMessageEvents(event);
  }

  return {
    body: "OK", // we have to return something
    statusCode: 200,
  };
};
