const Telegram = require("telegraf/telegram")
const { g11x, pasteText } = require("cumatronize")
const getData = require("./getData")
const storePic = require("./storePic")

const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN)

const onPhoto = async ({ update, replyWithPhoto }) => {
  const file = update.message.photo.pop().file_id // the last element from photo array has the largest image size
  const fileLink = await telegram.getFileLink(file) // Use telegram.getFileLink method to get the received photo's URL
  const sheetVerses = await getData({ range: "A1:A1000", verses: 4 })
  const g11xed = await g11x(fileLink)
  const m3m3 = await pasteText(g11xed, sheetVerses)
  const l1nk = await storePic(m3m3)
  replyWithPhoto(l1nk)
}

module.exports = onPhoto
