const TelegrafWit = require("telegraf-wit")

const getData = require("./getData")

const wit = new TelegrafWit(process.env.WIT_TOKEN)

const onText = ({ message, reply }) => {
  return wit.meaning(message.text).then(async result => {
    const intent = result.intents[0]
    if (intent) {
      switch (intent.name) {
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
    } else {
      reply("What?") // The bot didn't understand
    }
  })
}

module.exports = onText
