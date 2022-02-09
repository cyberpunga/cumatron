const { Wit } = require("node-wit");

async function getMeaning(text) {
  try {
    const wit = new Wit({ accessToken: process.env.WIT_TOKEN });
    const { intents } = await wit.message(text, {});
    const intent = intents.shift();
    console.log(text + "\nintents: ", JSON.stringify(intents, null, 2));
    return intent?.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { getMeaning };
