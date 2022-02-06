const Telegram = require("telegraf/telegram");
const Telegraf = require("telegraf");
const TelegrafWit = require("telegraf-wit");

const { request, gql } = require("graphql-request");

const { createMeme } = require("../../src/utils/createMeme");
const { storeUpload } = require("../../src/utils/cloudinary");

const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN);
const telegraf = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const wit = new TelegrafWit(process.env.WIT_TOKEN);

telegraf.start(({ reply }) => reply("Welcome!"));

const getData = async ({ range, verses }) => {
  const endpoint = "https://sheetpoetry.xyz/api";
  const spreadsheetId = "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg";
  const query = gql`
    query getWords($spreadsheetId: String!, $range: String!, $verses: Int) {
      sheetpoem(spreadsheetId: $spreadsheetId, range: $range, verses: $verses)
    }
  `;
  const variables = { spreadsheetId, range, verses };
  const { sheetpoem } = await request(endpoint, query, variables);
  return sheetpoem;
};

telegraf.on("text", async ({ message, reply }) => {
  const { intents } = await wit.meaning(message.text);
  console.log(intents);
  const intent = intents[0];
  if (intent) {
    switch (intent.name) {
      case "greeting":
        reply(await getData({ range: "F1:G1000", verses: 1 }));
        break;
      case "poem":
        reply(await getData({ range: "A1:A1000", verses: 4 }));
        break;
      case "dedicate":
        reply(await getData({ range: "A1:A1000", verses: 4 }));
        break;
      case "bienytu":
        reply(await getData({ range: "C1:E1000", verses: 1 }));
        break;
      case "influences":
        reply(await getData({ range: "M1:O1000", verses: 1 }));
        break;
      case "literature":
        reply(await getData({ range: "P1:R1000", verses: 1 }));
        break;
      case "bots":
        reply(await getData({ range: "S1:U1000", verses: 1 }));
        break;
      case "question":
        reply(await getData({ range: "M1:N1000", verses: 1 }));
        break;
      case "goodbye":
        reply("Chao");
        break;
      case "insult":
        reply("¡q wea perro culiao!");
        break;
      case "suggestion":
        reply("no toy na pa entretener humanos inferiores");
        break;
    }
  } else {
    reply("What?"); // The bot didn't understand
  }
});

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
