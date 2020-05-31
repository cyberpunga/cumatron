const path = require("path")
const Jimp = require("jimp")

const pasteText = async (image, text) => {
  const clean = await Jimp.read(image)
  const font = await Jimp.loadFont(path.join(__dirname, "./fonts/org_01.fnt"))
  await clean.print(
    font,
    32,
    0,
    {
      text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
      alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
    },
    clean.bitmap.width - 32,
    clean.bitmap.height
  )
  const imageBuffer = await clean.getBufferAsync(Jimp.MIME_JPEG)
  return imageBuffer
}

module.exports = pasteText
