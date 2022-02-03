const createPDF = require("./src/getBook");
const getBookData = require("./src/getBookData");
const getCleanImage = require("./src/getRandomImage");
const { g11x, pasteText } = require("cumatronize");
const slugify = require("slugify");

exports.handler = async () => {
  try {
    const cleanImage = await getCleanImage();
    const g1itchedImage = await g11x(cleanImage);
    const { title, content } = await getBookData();
    const cover = await pasteText(g1itchedImage, title);
    const filename = "cumi-" + slugify(title, { lower: true, strict: true }) + ".pdf";
    const body = await createPDF({ cover, title, content });
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "application/pdf",
        "Accept-Ranges": "bytes",
        "Content-Disposition": `inline; filename=${filename}`, // key of success
      },
      body,
    };
  } catch (error) {
    throw error;
  }
};
