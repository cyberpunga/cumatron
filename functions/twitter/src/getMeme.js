const { g11x, pasteText } = require("cumatronize")

async function getMeme(image, text) {
  const g11xed = await g11x(image)
  const meme = await pasteText(g11xed, text)
  return meme.toString("base64")
}

module.exports = getMeme
