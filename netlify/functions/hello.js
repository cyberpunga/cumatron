const { sheetpoetry } = require("../../src/utils");
const { getResources } = require("../../src/utils/cloudinary");
const { createMeme } = require("../../src/utils/createMeme");
const { tweet, uploadImage } = require("../../src/utils/twitter");

const pickRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

exports.handler = async (req) => {
  try {
    const sheetpoem = await sheetpoetry("poem");
    const images = await getResources();
    const random = pickRandomElement(images).secure_url.replace(/\/upload\/v([0-9])\w+\//g, "/upload/w_480/");
    const meme = await createMeme(random, sheetpoem);

    const { media_id_string } = await uploadImage({
      media_data: meme,
    });
    await tweet({
      status: sheetpoem,
      media_ids: media_id_string,
    });
    return {
      statusCode: 200,
      body: "OK",
    };
  } catch (error) {
    throw error;
  }
};
