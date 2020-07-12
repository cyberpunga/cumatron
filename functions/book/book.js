const getBook = require("./src/getBook")
const getBookData = require("./src/getBookData")
const getRandomImage = require("./src/getRandomImage")
const { g11x, pasteText } = require("cumatronize")

exports.handler = async () => {
  try {
    const randomImage = await getRandomImage()
    const g1itchedImage = await g11x(randomImage)
    const { title, content } = await getBookData()
    const cover = await pasteText(g1itchedImage, title)
    const book = await getBook({ cover, title, content })
    const filename = "cumi-" + title.trim().slice(0, 32)
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "application/pdf",
        "Accept-Ranges": "bytes",
        "Content-Disposition": `inline; filename=${filename}.pdf`, // key of success
      },
      body: book,
    }
  } catch (error) {
    throw error
  }
}
