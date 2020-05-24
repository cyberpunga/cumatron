import React, { useEffect } from "react"

export default props => {
  const speak = message => {
    const msg = new SpeechSynthesisUtterance(message)
    msg.rate = 0.8
    window.speechSynthesis.speak(msg)
  }

  useEffect(() => {
    speak(props.words)
  })

  return null
}
