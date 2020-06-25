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

async function post(content, replyTo) {
  await twitter.post("statuses/update", {
    status: content,
    in_reply_to_status_id: replyTo,
    auto_populate_reply_metadata: true,
  })
}

async function tweetBack(event) {
  const message = event.tweet_create_events.shift()
  if (message.user.id_str !== "1029886558940356608") {
    const meaning = await wit.meaning(message.text)
    const intent = meaning.intents[0]
    if (intent.name) {
      switch (intent.name) {
        case "greeting":
          const greeting = await getData({ range: "F1:G1000", verses: 1 })
          await post(greeting, message.id_str)
          break
        case "poem":
          const poem = await getData({ range: "A1:A1000", verses: 4 })
          await post(poem, message.id_str)
          break
        case "dedicate":
          const dedicate = await getData({ range: "A1:A1000", verses: 4 })
          await post(dedicate, message.id_str)
          break
        case "bienytu":
          const bienytu = await getData({ range: "C1:E1000", verses: 1 })
          await post(bienytu, message.id_str)
          break
        case "influences":
          const influences = await getData({ range: "M1:O1000", verses: 1 })
          await post(influences, message.id_str)
          break
        case "literature":
          const literature = await getData({ range: "P1:R1000", verses: 1 })
          await post(literature, message.id_str)
          break
        case "bots":
          const bots = await getData({ range: "S1:U1000", verses: 1 })
          await post(bots, message.id_str)
          break
        case "question":
          const question = await getData({ range: "M1:N1000", verses: 1 })
          await post(question, message.id_str)
          break
        case "goodbye":
          await post("chao", message.id_str)
          break
        case "insult":
          await post("y k wa bastardo qlo!", message.id_str)
          break
        case "suggestion":
          await post(
            "no toy na pa entretener humanos inferiores.",
            message.id_str
          )
          break
      }
    } else {
      await post("qué?", message.id_str)
    }
  }
}

module.exports = { tweetBack }
