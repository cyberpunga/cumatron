const { request } = require("graphql-request")

const getData = async ({ range, verses }) => {
  const endpoint = process.env.SHEETPOETRY_API_ENDPOINT
  const spreadsheetId = "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg"
  const query = `
    query getWords($spreadsheetId: String!, $range: String!, $verses: Int) {
      sheetpoem(spreadsheetId: $spreadsheetId, range: $range, verses: $verses)
    }
    `
  const variables = { spreadsheetId, range, verses }
  const { sheetpoem } = await request(endpoint, query, variables)
  return sheetpoem
}
module.exports = getData
