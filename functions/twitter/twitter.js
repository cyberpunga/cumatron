const {
  validateWebhook,
  replyDirectMessage,
  replyTweet,
  tweet,
  likeTweet,
  uploadImage,
} = require("./src")
const getData = require("./src/getData")
const TelegrafWit = require("telegraf-wit")
const { g11x, pasteText } = require("cumatronize")

const wit = new TelegrafWit(process.env.WIT_TOKEN)

function randomEmoji() {
  const emojis = ["💥", "🔥", "💾", "🤖", "🤯"]
  return emojis[Math.floor(Math.random() * emojis.length)]
}

const responses = {
  greeting: { range: "F1:G1000", verses: 1 },
  poem: { range: "A1:A1000", verses: 4 },
  dedicate: { range: "A1:A1000", verses: 4 },
  bienytu: { range: "C1:E1000", verses: 1 },
  influences: { range: "M1:O1000", verses: 1 },
  literature: { range: "P1:R1000", verses: 1 },
  bots: { range: "S1:U1000", verses: 1 },
  question: { range: "M1:N1000", verses: 1 },
  goodbye: { range: "Z1000:Z1000", verses: 1 },
  insult: { range: "Z1000:Z1000", verses: 1 },
  suggestion: { range: "Z1000:Z1000", verses: 1 },
}

exports.handler = async ({ queryStringParameters, body }) => {
  try {
    if (queryStringParameters.crc_token) {
      const responseToken = validateWebhook(queryStringParameters.crc_token)
      return {
        body: JSON.stringify({ response_token: `sha256=${responseToken}` }),
        statusCode: 200,
      }
    } else if (queryStringParameters.hola) {
      const poem = await getData({ range: "A1:A1000", verses: 4 })
      await tweet({
        status: poem,
      })
      return {
        body: "OK",
        statusCode: 200,
      }
    } else {
      const event = JSON.parse(body, null, 2)
      if (event.direct_message_events) {
        const message = event.direct_message_events[0]
        const me = process.env.TWITTER_ACCESS_TOKEN.split("-")[0]
        const { sender_id } = message.message_create
        const { recipient_id } = message.message_create.target
        const { text } = message.message_create.message_data
        if (recipient_id === me) {
          const { intents } = await wit.meaning(text !== null ? text : "none")
          if (intents.length) {
            const intent = intents[0].name
            const reply = await getData(responses[intent])
            await replyDirectMessage(reply || randomEmoji(), sender_id)
          } else {
            await replyDirectMessage(randomEmoji(), sender_id)
          }
        }
      } else if (event.tweet_create_events) {
        const tweet = event.tweet_create_events[0]
        const text = tweet.text.replace("@cumatron_win", "")

        if (!tweet.retweeted_status) {
          if (
            tweet.user.id_str !== process.env.TWITTER_ACCESS_TOKEN.split("-")[0]
          ) {
            const { media } = tweet.entities
            if (media && media.length) {
              const photo = media.find(item => item.type === "photo")
              if (photo) {
                const sheetVerses = await getData({
                  range: "A1:A1000",
                  verses: 4,
                })
                const g11xed = await g11x(photo.media_url_https)
                const m3m3 = await pasteText(g11xed, sheetVerses)
                const { media_id_string } = await uploadImage(m3m3)
                await replyTweet({
                  status: sheetVerses,
                  in_reply_to_status_id: tweet.id_str,
                  auto_populate_reply_metadata: true,
                  media_ids: media_id_string,
                })
                return
              }
            }

            const { intents } = await wit.meaning(text !== null ? text : "none")
            if (intents.length) {
              const intent = intents[0].name
              const reply = await getData(responses[intent])
              await replyTweet({
                status: reply || randomEmoji(),
                in_reply_to_status_id: tweet.id_str,
                auto_populate_reply_metadata: true,
              })
            } else {
              await replyTweet({
                status: randomEmoji(),
                in_reply_to_status_id: tweet.id_str,
                auto_populate_reply_metadata: true,
              })
            }
          }
        } else {
          await likeTweet({ id: tweet.id_str })
        }
      }
      return {
        body: "OK", // return something
        statusCode: 200,
      }
    }
  } catch (e) {
    console.error(e)
  }
}
