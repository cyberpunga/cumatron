const Telegraf = require("telegraf")
const Telegram = require("telegraf/telegram")
const TelegrafWit = require("telegraf-wit")

const telegraf = new Telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)
const wit = new TelegrafWit(process.env.WIT_TOKEN)

telegraf.start(({ reply }) => reply("Welcome!"))
telegraf.help(({ reply }) => reply("Send me a sticker"))
telegraf.on("sticker", ({ reply }) => reply("👍"))
telegraf.hears("hi", ({ reply }) => reply("Hey there"))

telegraf.on("text", ({ message, reply }) => {
  console.log("message: " + message)
  return wit.meaning(message.text).then(result => {
    console.log("result: " + result)
    // reply to user with wit result
    const { intent } = result.entities
    if (intent) {
      switch (intent[0].value) {
        case "greeting":
          reply("Hola")
          break
        case "goodbye":
          reply("Chao")
          break
        // The bot didn't understand
        case "UNK":
          reply("What?")
          break
      }
    }
  })
})

/* AWS Lambda handler function */
exports.handler = (event, context, callback) => {
  const tmp = JSON.parse(event.body) // get data passed to us
  telegraf.handleUpdate(tmp) // make Telegraf process that data
  return callback(null, {
    // return something for webhook, so it doesn't try to send same stuff again
    statusCode: 200,
    body: "",
  })
}
