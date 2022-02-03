const getData = require("./getData")
const getIntent = require("./getIntent")
const { responses, randomEmoji } = require("./utils")
const { replyDirectMessage } = require("./twitter")

async function onDirectMessage(direct_message_events) {
  const message = direct_message_events[0]
  const me = process.env.TWITTER_ACCESS_TOKEN.split("-")[0]
  const senderId = message.message_create.sender_id
  const { recipient_id } = message.message_create.target
  const { text } = message.message_create.message_data
  if (recipient_id === me) {
    const intent = await getIntent(text)
    if (intent && intent.length) {
      console.log(intent)
      const reply = await getData(responses[intent])
      await replyDirectMessage(reply || randomEmoji(), senderId)
    } else {
      await replyDirectMessage(randomEmoji(), senderId)
    }
  }
}

module.exports = onDirectMessage
