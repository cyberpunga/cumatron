const Telegram = require("telegraf/telegram");
const Telegraf = require("telegraf");
const { request, gql } = require("graphql-request");

const { createMeme } = require("../../../src/utils/createMeme");
const { storeUpload } = require("../../../src/utils/cloudinary");

// const getData = require("./getData");

const onText = require("./src/onText");

const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN);
const telegraf = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

telegraf.start(({ reply }) => reply("Welcome!"));

telegraf.on("text", onText);

telegraf.on("photo", async ({ update, replyWithPhoto }) => {
  const received = update.message.photo.pop().file_id; // the last element from photo array has the largest image size
  const receivedURL = await telegram.getFileLink(received); // Use telegram.getFileLink method to get the received photo's URL
  const { sheetpoem } = await request(
    "https://sheetpoetry.xyz/api",
    gql`
      {
        sheetpoem(spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg", range: "A1:A1000", verses: 4)
      }
    `
  );
  const meme = await createMeme(receivedURL, sheetpoem);
  const outputURL = await storeUpload(meme);
  replyWithPhoto(outputURL);
});

exports.handler = async ({ body }) => {
  try {
    await telegraf.handleUpdate(JSON.parse(body)); // make Telegraf process that data passed to us
    return {
      statusCode: 200,
      body: "Hello, World", // return something
    };
  } catch (error) {
    throw error;
  }
};
