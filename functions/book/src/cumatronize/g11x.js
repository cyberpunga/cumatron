const Jimp = require("jimp")
const gl33ch = require("@piducancore/gl33ch")

const g11x = async image => {
  const clean = await Jimp.read(image)
  await clean /*.resize(480, Jimp.AUTO)*/
    .quality(60)
  const f5ck = await gl33ch(clean)
  const imageBuffer = await f5ck.getBufferAsync(Jimp.MIME_JPEG)
  return imageBuffer
}

module.exports = g11x
