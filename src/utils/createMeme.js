const path = require("path");
const Jimp = require("jimp");
const gleech = require("@piducancore/gl33ch/src");

async function glitch(input) {
  const image = await gleech.read(input);
  await image.drumrollVerticalWave();
  await image.fractal(Math.floor(Math.random()));
  await image.colorShift();
  return image;
}

async function pasteText(image, text) {
  const font = await Jimp.loadFont(path.join(__dirname, "../../static/org_01.fnt"));
  const alignmentX = Jimp.HORIZONTAL_ALIGN_LEFT;
  const alignmentY = Jimp.VERTICAL_ALIGN_BOTTOM;
  image.print(font, 32, 0, { text, alignmentX, alignmentY }, image.bitmap.width - 32, image.bitmap.height);
  const imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  return imageBuffer;
}

async function createMeme(image, text) {
  const glitchedImage = await glitch(image);
  const meme = await pasteText(glitchedImage, text);
  return meme;
}

module.exports = { createMeme };
