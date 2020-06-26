const Twitter = require("twitter-lite")
const TelegrafWit = require("telegraf-wit")

const getData = require("./getData")

const wit = new TelegrafWit(process.env.WIT_TOKEN)
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

// async function markAsRead(messageId, recipientId) {
//   await twitter.post("direct_messages/mark_read", {
//     last_read_event_id: messageId,
//     recipient_id: recipientId,
//   })
// }

async function indicateTyping(recipientId) {
  await twitter.post("direct_messages/indicate_typing", {
    recipient_id: recipientId,
  })
}

async function sendDirectMessage(message, recipientId) {
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
    const meaning = await wit.meaning(messageText)
    const intent = meaning.intents[0]
    if (intent.name) {
      switch (intent.name) {
        case "greeting":
          const greeting = await getData({ range: "F1:G1000", verses: 1 })
          // await markAsRead(message.message_create.id, senderId)
          await indicateTyping(senderId)
          await sendDirectMessage(greeting, senderId)
          break
        case "poem":
          const poem = await getData({ range: "A1:A1000", verses: 4 })
          await indicateTyping(senderId)
          await sendDirectMessage(poem, senderId)
          break
        case "dedicate":
          const dedicate = await getData({ range: "A1:A1000", verses: 4 })
          await indicateTyping(senderId)
          await sendDirectMessage(dedicate, senderId)
          break
        case "bienytu":
          const bienytu = await getData({ range: "C1:E1000", verses: 1 })
          await indicateTyping(senderId)
          await sendDirectMessage(bienytu, senderId)
          break
        case "influences":
          const influences = await getData({ range: "M1:O1000", verses: 1 })
          await indicateTyping(senderId)
          await sendDirectMessage(influences, senderId)
          break
        case "literature":
          const literature = await getData({ range: "P1:R1000", verses: 1 })
          await indicateTyping(senderId)
          await sendDirectMessage(literature, senderId)
          break
        case "bots":
          const bots = await getData({ range: "S1:U1000", verses: 1 })
          await indicateTyping(senderId)
          await sendDirectMessage(bots, senderId)
          break
        case "question":
          const question = await getData({ range: "M1:N1000", verses: 1 })
          await indicateTyping(senderId)
          await sendDirectMessage(question, senderId)
          break
        case "goodbye":
          await indicateTyping(senderId)
          await sendDirectMessage("chao", senderId)
          break
        case "insult":
          await indicateTyping(senderId)
          await sendDirectMessage("y k wa bastardo qlo!", senderId)
          break
        case "suggestion":
          await indicateTyping(senderId)
          await sendDirectMessage(
            "no toy na pa entretener humanos inferiores.",
            senderId
          )
          break
      }
    } else {
      await indicateTyping(senderId)
      await sendDirectMessage("qué?", senderId)
    }
  }
}

module.exports = {
  indicateTyping,
  sendDirectMessage,
  replyDirectMessage,
}
