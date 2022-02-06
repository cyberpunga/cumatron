const path = require("path");
const Jimp = require("jimp");
const gleech = require("gleech");

async function createMeme(image, text) {
  const font = await Jimp.loadFont(path.join(__dirname, "../../static/org_01.fnt"));
  const xoxo = await gleech.read(image);
  xoxo.quality(60);

  await xoxo.drumrollVerticalWave();
  await xoxo.fractal(Math.floor(Math.random()));
  await xoxo.colorShift();
  await xoxo.print(
    font,
    32,
    0,
    { text, alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM },
    xoxo.bitmap.width - 32,
    xoxo.bitmap.height
  );

  const buffer = await xoxo.getBufferAsync(Jimp.MIME_JPEG);
  return buffer;
}

module.exports = { createMeme };
