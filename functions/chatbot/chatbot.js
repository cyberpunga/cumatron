const path = require("path")
const Telegraf = require("telegraf")
const Telegram = require("telegraf/telegram")
const TelegrafWit = require("telegraf-wit")
const { request } = require("graphql-request")
const Jimp = require("jimp")
const cloudinary = require("cloudinary")
const gl33ch = require("@piducancore/gl33ch")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const c = {
  upload: (image, options, cb) => {
    cloudinary.v2.uploader.upload(image, options, (error, result) => {
      if (error) throw error
      // console.log(JSON.stringify(result, null, 2));
      // console.log(result);
      cb(result.url)
    })
  },
  list: (folder, cb) => {
    cloudinary.v2.api.resources({ type: "upload", prefix: folder }, function(
      error,
      result
    ) {
      if (error) throw error
      cb(result.resources)
    })
  },
}

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
})

const glitchCover = async (image, text) => {
  const font = await Jimp.loadFont(path.join(__dirname, "fonts/org_01.fnt"))
  const textWidth = Jimp.measureText(font, text)
  const glitched = await gl33ch(image)
  const resized = await glitched.resize(textWidth / 2, Jimp.AUTO) // resize to textWidth and scale height accordingly

  const w = resized.bitmap.width
  const h = resized.bitmap.height

  const withText = resized.print(
    font,
    32,
    0,
    {
      text: text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
      alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
    },
    w - 32,
    h
  )
  // const buffer = await withText.getBufferAsync(Jimp.AUTO)
  const base64 = await withText.getBase64Async(Jimp.AUTO)

  return base64
}

// ON RECEIVE PHOTO
telegraf.on("photo", async ({ update, replyWithPhoto }) => {
  // Use telegram.getFileLink method to get the received photo's URL
  const photoUrl = await telegram.getFileLink(
    update.message.photo.pop().file_id
  )

  const text = await getData({ range: "A1:A1000", verses: 4 })
  const image = await glitchCover(photoUrl, text)

  // Upload unmodified photo for our book cover archive
  // c.upload(photoUrl, { folder: "clean/" }, success => {
  //   console.log(`clean image uploaded: ${success}`)
  // })

  // const glitched = await glitch(photoUrl)
  // const base64 = await glitched.getBase64Async(Jimp.AUTO)

  c.upload(image, {}, url => {
    replyWithPhoto(url)
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
