const Telegraf = require("telegraf")
const Telegram = require("telegraf/telegram")
const TelegrafWit = require("telegraf-wit")

const telegraf = new Telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)
const wit = new TelegrafWit(process.env.WIT_TOKEN)

telegraf.start(ctx => ctx.reply("Welcome!"))
telegraf.help(ctx => ctx.reply("Send me a sticker"))
telegraf.on("sticker", ctx => ctx.reply("👍"))
telegraf.hears("hi", ctx => ctx.reply("Hey there"))

telegraf.on("text", ctx => {
  return wit.meaning(ctx.message.text).then(result => {
    // reply to user with wit result
    const { intent } = result.entities
    if (intent) {
      switch (intent[0].value) {
        case "greeting":
          ctx.reply("Hola")
          break
        case "goodbye":
          ctx.reply("chao")
          break
        // The bot didn't understand
        case "UNK":
          ctx.reply("What?")
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
