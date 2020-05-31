const getBook = require("./src/getBook")

exports.handler = async () => {
  try {
    const book = await getBook()
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-type": "application/pdf",
        "accept-ranges": "bytes",
      },
      body: book,
    }
  } catch (error) {
    throw error
  }
}
