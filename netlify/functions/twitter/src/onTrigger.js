const getData = require("./getData")
const getRandomImage = require("./getRandomImage")
const getMeme = require("./getMeme")
const { uploadImage, tweet } = require("./twitter")

async function onTrigger() {
  if (Math.random() > 0.5) {
    await tweetText()
  } else {
    await tweetPhoto()
  }
}

async function tweetText() {
  const text = await getData({ range: "A1:A1000", verses: 4 })
  await tweet({
    status: text,
  })
}

async function tweetPhoto() {
  const text = await getData({ range: "A1:A1000", verses: 4 })
  const image = await getRandomImage()
  const meme = await getMeme(image, text)
  const { media_id_string } = await uploadImage({
    media_data: meme,
  })
  const success = await tweet({
    status: text,
    media_ids: media_id_string,
  })
  console.log(JSON.stringify(success, null, 2))
}

module.exports = onTrigger
