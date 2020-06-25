const TelegrafWit = require("telegraf-wit")

const wit = new TelegrafWit(process.env.WIT_TOKEN)

async function getMeaning(event, config) {
  const mention = event.tweet_create_events.shift()

  const meaning = await wit.meaning(mention.text)
  const intent = meaning.intents[0]
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
  // const tweet = await client.post("statuses/update", {
  //   status: status,
  //   in_reply_to_status_id: mention.id_str,
  //   auto_populate_reply_metadata: true,
  // })
}

module.exports = { getMeaning }
