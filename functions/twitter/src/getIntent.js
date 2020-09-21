const TelegrafWit = require("telegraf-wit")

const wit = new TelegrafWit(process.env.WIT_TOKEN)

async function getIntent(text) {
  if (text !== null) {
    const { intents } = await wit.meaning(text)
    if (intents.length) {
      return intents[0].name
    } else {
      return false
    }
  }
  return false
}

module.exports = getIntent
