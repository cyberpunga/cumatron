const Telegraf = require("telegraf")
const onText = require("./src/onText")
const onPhoto = require("./src/onPhoto")

const telegraf = new Telegraf(process.env.BOT_TOKEN)

telegraf.start(({ reply }) => reply("Welcome!"))
telegraf.on("sticker", ({ reply }) => reply("👍"))
telegraf.on("text", onText)
telegraf.on("photo", onPhoto)

exports.handler = async ({ body }) => {
  telegraf.handleUpdate(JSON.parse(body)) // make Telegraf process that data passed to us
  return {
    statusCode: 200,
    body: "Hello, World", // return something
  }
}
