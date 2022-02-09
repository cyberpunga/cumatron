const { sheetpoetry } = require("../../src/utils");
const { getResources } = require("../../src/utils/cloudinary");
const { createMeme } = require("../../src/utils/createMeme");
const { tweet, uploadImage } = require("../../src/utils/twitter");

exports.handler = async (req) => {
  try {
    const sheetpoem = await sheetpoetry("poem");
    console.log(sheetpoem);
    const images = await getResources();
    const pickRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const random = pickRandomElement(images).secure_url.replace(/\/upload\/v([0-9])\w+\//g, "/upload/w_480/");
    console.log(random);
    const meme = await createMeme(random, sheetpoem);
    const { media_id_string } = await uploadImage({ media_data: meme.toString("base64") });
    console.log(media_id_string);
    await tweet({
      status: sheetpoem,
      media_ids: media_id_string,
    });
  } catch (error) {
    console.log(error);
  }
  return {
    body: "OK", // we have to return something
    statusCode: 200,
  };
};
