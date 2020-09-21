const responses = {
  greeting: { range: "F1:G1000", verses: 1 },
  poem: { range: "A1:A1000", verses: 4 },
  dedicate: { range: "A1:A1000", verses: 4 },
  bienytu: { range: "C1:E1000", verses: 1 },
  influences: { range: "M1:O1000", verses: 1 },
  literature: { range: "P1:R1000", verses: 1 },
  book: { range: "P1:R1000", verses: 1 },
  bots: { range: "S1:U1000", verses: 1 },
  question: { range: "M1:N1000", verses: 1 },
  goodbye: { range: "Z1000:Z1000", verses: 1 },
  insult: { range: "Z1000:Z1000", verses: 1 },
  suggestion: { range: "Z1000:Z1000", verses: 1 },
}

function randomEmoji() {
  const emojis = ["💥", "🔥", "💾", "🤖", "🤯"]
  return emojis[Math.floor(Math.random() * emojis.length)]
}

module.exports = { responses, randomEmoji }
