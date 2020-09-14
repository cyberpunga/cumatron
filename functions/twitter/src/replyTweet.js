const Twitter = require("twitter-lite")
const TelegrafWit = require("telegraf-wit")
const { g11x, pasteText } = require("cumatronize")

const getData = require("./getData")
const storePic = require("./storePic")

const wit = new TelegrafWit(process.env.WIT_TOKEN)

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})
const twitterUpload = new Twitter({
  subdomain: "upload",
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

async function post(content, replyTo) {
  try {
    await twitter.post("statuses/update", {
      status: content,
      in_reply_to_status_id: replyTo,
      auto_populate_reply_metadata: true,
    })
  } catch (e) {
    console.log(e)
  }
}

async function postWithImage(content, replyTo, attachment) {
  try {
    await twitter.post("statuses/update", {
      status: content,
      in_reply_to_status_id: replyTo,
      auto_populate_reply_metadata: true,
      media_ids: attachment,
    })
  } catch (e) {
    console.log(e)
  }
}

async function upload(media) {
  try {
    const success = await twitterUpload.post("media/upload", {
      media_data: media.toString("base64"),
    })
    return success
  } catch (e) {
    console.log(e)
  }
}

async function tweet(content) {
  try {
    await twitter.post("statuses/update", {
      status: content,
    })
  } catch (e) {
    console.log(e)
  }
}

async function replyTweet(event) {
  const message = event.tweet_create_events.shift()
  const messageText = message.text.replace("@cumatron_win", "")

  if (message.user.id_str !== process.env.TWITTER_ACCESS_TOKEN.split("-")[0]) {
    const { media } = message.entities

    if (media && media.length) {
      const photo = media.find(item => item.type === "photo")
      if (photo) {
        const url = photo.media_url_https
        const sheetVerses = await getData({ range: "A1:A1000", verses: 4 })
        const g11xed = await g11x(url)
        const m3m3 = await pasteText(g11xed, sheetVerses)
        // const l1nk = await storePic(m3m3)
        const mimi = await upload(m3m3)
        await postWithImage(sheetVerses, message.id_str, mimi.media_id_string)
        return
      }
    }

    const { intents } = await wit.meaning(messageText)
    if (intents.length) {
      switch (intents[0].name) {
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

module.exports = { replyTweet, tweet }
