// const TelegrafWit = require("telegraf-wit")
// const wit = new TelegrafWit(process.env.WIT_TOKEN)
const Twitter = require("twitter-lite")

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

async function markAsRead(messageId, recipientId) {
  await twitter.post("direct_messages/mark_read", {
    last_read_event_id: messageId,
    recipient_id: recipientId,
  })
}

async function indicateTyping(recipientId) {
  await twitter.post("direct_messages/indicate_typing", {
    recipient_id: recipientId,
  })
}

async function sendDirectMessage(recipientId, message) {
  await twitter.post("direct_messages/events/new", {
    event: {
      type: "message_create",
      message_create: {
        target: {
          recipient_id: recipientId,
        },
        message_data: {
          text: message,
        },
      },
    },
  })
}

async function replyDirectMessage(event) {
  const message = event.direct_message_events.shift()
  const messageText = message.message_create.message_data.text
  const senderId = message.message_create.sender_id
  const senderScreenName = event.users[senderId].screen_name
  const recipientId = message.message_create.target.recipient_id
  const myId = process.env.TWITTER_ACCESS_TOKEN.split("-")[0]

  if (typeof message === "undefined") return
  if (typeof message.message_create === "undefined") return
  if (senderId === recipientId) return
  console.log(`${senderScreenName} says ${messageText}`)
  if (recipientId === myId) {
    // const intent = await wit.meaning(messageText)
    // if (intent) {
    //   console.log(intent)
    // }
    await markAsRead(message.message_create.id, senderId)
    await indicateTyping(senderId)
    await sendDirectMessage(senderId, `hola @${senderScreenName}! 👋`)
  }
}

module.exports = {
  indicateTyping,
  sendDirectMessage,
  replyDirectMessage,
}
