// #!/usr/bin/env node

// 1st party
// const path = require("path")

// 3rd party
// const { argv } = require("yargs")
const Jimp = require("jimp")
const chance = new (require("chance"))()
const _ = require("lodash")

require("./glitcher")

async function glitchImageSuperRandom(image) {
  const actionFunctions = [
    {
      likelihood: 90,
      fn(image) {
        return image.rgb_glitch(
          chance.integer({ min: 0, max: 1000 }),
          chance.integer({ min: 0, max: 2 }),
          true
        )
      },
    },
    {
      likelihood: 50,
      fn(image) {
        return chance.bool()
          ? image.drumrollHorizontalWave()
          : image.drumrollVerticalWave()
      },
    },
    {
      likelihood: 50,
      fn(image) {
        return image.ditherFloydSteinberg()
      },
    },
    {
      likelihood: 60,
      fn(image) {
        return image.rgb_glitch(chance.integer({ min: 0, max: 1000 }))
      },
    },
    {
      likelihood: 50,
      fn(image) {
        return image.rgb_glitch(chance.integer({ min: 0, max: 1000 }))
      },
    },
    {
      likelihood: 50,
      fn(image) {
        return image.fractal(chance.floating({ min: 0, max: 1 }))
      },
    },
    {
      likelihood: 50,
      fn(image) {
        return image.colorShift()
      },
    },
  ]

  for (const actionFn of _.shuffle(actionFunctions)) {
    if (chance.bool({ likelihood: actionFn.likelihood })) {
      await actionFn.fn(image)
    }
  }

  return image
}

module.exports = async inputImage => {
  // const inputImage = argv.i || argv._[0]
  // const pathInfo = path.parse(inputImage)

  const image = await Jimp.read(inputImage)
  const glitched = await glitchImageSuperRandom(image)
  return glitched
  // await image.writeAsync("out" + pathInfo.ext)
}

// run()
