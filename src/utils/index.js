const { request } = require("graphql-request");

const sheetpoetry = async (query) => {
  const data = await request("https://sheetpoetry.xyz/api", query);
  return data;
};

module.exports = { sheetpoetry };
