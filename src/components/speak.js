import React, { useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const WORDS = gql`
  query Words {
    words @client
    canSpeak @client
  }
`

export default () => {
  const speak = message => {
    const msg = new SpeechSynthesisUtterance(message)
    msg.rate = 0.8
    window.speechSynthesis.speak(msg)
  }

  const {
    data: { words, canSpeak },
  } = useQuery(WORDS)

  useEffect(() => {
    if (canSpeak) {
      speak(words)
    }
  })

  return <></>
}
