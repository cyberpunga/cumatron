const randomInteger = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomPosition = (min, max) => {
  return shuffleArray([
    randomInteger(max * -1, max),
    randomInteger(max * -1, max),
    negativeOrPositive(randomInteger(min, max)),
  ])
}

const negativeOrPositive = n => {
  if (Math.random() >= 0.5) {
    return n * 1
  } else {
    return n * -1
  }
}

const shuffleArray = array => {
  var j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}

export { randomInteger, randomPosition, negativeOrPositive, shuffleArray }
