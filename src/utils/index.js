const { request, gql } = require("graphql-request");

const rangesByIntent = {
  greeting: { range: "F1:G1000", verses: 1 },
  poem: { range: "A1:A1000", verses: 4 },
  dedicate: { range: "A1:A1000", verses: 4 },
  bienytu: { range: "C1:E1000", verses: 1 },
  influences: { range: "M1:O1000", verses: 1 },
  literature: { range: "P1:R1000", verses: 1 },
  book: { range: "P1:R1000", verses: 1 },
  bots: { range: "S1:U1000", verses: 1 },
  question: { range: "M1:N1000", verses: 1 },
  goodbye: { range: "Z1000:Z1000", verses: 1 },
  insult: { range: "Z1000:Z1000", verses: 1 },
  suggestion: { range: "Z1000:Z1000", verses: 1 },
};

async function sheetpoetry(intent) {
  const endpoint = "https://sheetpoetry.xyz/api";
  const query = gql`
    query($range: String!, $verses: Int) {
      sheetpoem(spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg", range: $range, verses: $verses)
    }
  `;
  const variables = rangesByIntent[intent];

  const { sheetpoem } = await request(endpoint, query, variables);
  return sheetpoem;
}

module.exports = { sheetpoetry, rangesByIntent };
