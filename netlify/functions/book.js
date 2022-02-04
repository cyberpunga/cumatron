const { createPDF } = require("../../src/utils/createPDF");
const gleech = require("gleech");

exports.handler = async () => {
  console.log(gleech);
  try {
    const fileContent = await createPDF();
    const fileName = "cumi - " + Date.now() + ".pdf";
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
