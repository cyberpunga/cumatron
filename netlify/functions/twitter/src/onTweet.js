const getData = require("./getData")
const getMeme = require("./getMeme")
const getIntent = require("./getIntent")
const { responses, randomEmoji } = require("./utils")
const { likeTweet, uploadImage, tweet } = require("./twitter")

async function onTweet(tweet_create_events) {
  const message = tweet_create_events[0]
  const me = process.env.TWITTER_ACCESS_TOKEN.split("-")[0]
  const senderId = message.user.id_str
  const text = message.text.replace("@cumatron_win", "")
  console.log("events: " + JSON.stringify(tweet_create_events))

  if (message.retweeted_status) {
    await likeTweet({ id: message.id_str })
    return
  }

  if (senderId !== me) {
    const { media } = message.entities
    if (media && media.length) {
      const photo = media.find(item => item.type === "photo")
      if (photo) {
        const image = photo.media_url_https
        const text = await getData({ range: "A1:A1000", verses: 4 })
        const meme = await getMeme(image, text)
        const { media_id_string } = await uploadImage({
          media_data: meme,
        })
        const success = await tweet({
          status: text,
          in_reply_to_status_id: message.id_str,
          auto_populate_reply_metadata: true,
          media_ids: media_id_string,
        })
        console.log("success: " + JSON.stringify(success))
      }
    } else {
      const intent = await getIntent(text)
      if (intent && intent.length) {
        const reply = await getData(responses[intent])
        await tweet({
          status: reply || randomEmoji(),
          in_reply_to_status_id: message.id_str,
          auto_populate_reply_metadata: true,
        })
      } else {
        await tweet({
          status: randomEmoji(),
          in_reply_to_status_id: message.id_str,
          auto_populate_reply_metadata: true,
        })
      }
    }
  }
}

module.exports = onTweet
