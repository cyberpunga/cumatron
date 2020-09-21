const getData = require("./getData")
const { tweet } = require("./twitter")

async function onTrigger() {
  const poem = await getData({ range: "A1:A1000", verses: 4 })
  await tweet({
    status: poem,
  })
}

module.exports = onTrigger
