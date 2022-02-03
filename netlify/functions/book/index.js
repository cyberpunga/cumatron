const slugify = require("slugify");
const { request } = require("graphql-request");
const { createPDF } = require("./src/createPDF");

const bookQuery = `{
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
    }`;

exports.handler = async () => {
  try {
    const { title, content } = await request("https://sheetpoetry.xyz/api", bookQuery);
    const fileContent = await createPDF({ title, content });
    const fileName = "cumi-" + slugify(title, { lower: true, strict: true }) + ".pdf";
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "application/pdf",
        "Accept-Ranges": "bytes",
        "Content-Disposition": `inline; filename=${fileName}`, // key of success
      },
      body: fileContent,
    };
  } catch (error) {
    throw error;
  }
};
