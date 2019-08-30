const Telegraf = require("telegraf")
const Telegram = require("telegraf/telegram")
const TelegrafWit = require("telegraf-wit")
const { request } = require("graphql-request")

const telegraf = new Telegraf(process.env.BOT_TOKEN)
const telegram = new Telegram(process.env.BOT_TOKEN)
const wit = new TelegrafWit(process.env.WIT_TOKEN)

const getData = async ({ range, verses }) => {
  const endpoint = `${process.env.URL}/.netlify/functions/graphql`
  const query = `
    query getWords($spreadsheetId: String!, $range: String!, $verses: Int) {
      sheetpoem(spreadsheetId: $spreadsheetId, range: $range, verses: $verses)
    }
  `
  const variables = {
    spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg",
    range: range,
    verses: verses,
  }

  const data = await request(endpoint, query, variables)
  return data.sheetpoem
}

telegraf.start(({ reply }) => reply("Welcome!"))
telegraf.help(({ reply }) => reply("Send me a sticker"))
telegraf.on("sticker", ({ reply }) => reply("👍"))
telegraf.hears("hi", ({ reply }) => reply("Hey there"))

telegraf.on("text", ({ message, reply }) => {
  return wit.meaning(message.text).then(async result => {
    const { intent } = result.entities
    if (intent) {
      let sheetpoem = ""
      switch (intent[0].value) {
        case "greeting":
          reply(await getData({ range: "F1:G1000", verses: 1 }))
          break
        case "poem":
          reply(await getData({ range: "A1:A1000", verses: 4 }))
          break
        case "dedicate":
          reply(await getData({ range: "A1:A1000", verses: 4 }))
          break
        case "bienytu":
          reply(await getData({ range: "C1:E1000", verses: 1 }))
          break
        case "influences":
          reply(await getData({ range: "M1:O1000", verses: 1 }))
          break
        case "literature":
          reply(await getData({ range: "P1:R1000", verses: 1 }))
          break
        case "bots":
          reply(await getData({ range: "S1:U1000", verses: 1 }))
          break
        case "question":
          reply(await getData({ range: "M1:N1000", verses: 1 }))
          break
        case "goodbye":
          reply("Chao")
          break
        case "insult":
          reply("¡q wea perro culiao!")
          break
        case "suggestion":
          reply("no toy na pa entretener humanos inferiores")
          break
      }
    } else reply("What?") // The bot didn't understand
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
