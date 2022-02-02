const { request } = require("graphql-request")

const getBookData = async () => {
  const endpoint = process.env.SHEETPOETRY_API_ENDPOINT
  const query = `{
    content: sheetpoem(
      spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg"
      range: "A1:A1000"
      verses: 200
    )
    title: sheetpoem(
      spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg"
      range: "C1:E1000"
      verses: 1
    )
  }`
  const { title, content } = await request(endpoint, query)
  return { title, content }
}

module.exports = getBookData
