import React from "react"
import styled from "styled-components"
import { ScTelegram, ScFacebook, ScTwitter } from "styled-icons/evil"

const Heading = styled.h1`
  font-family: Org_v01;
  /* display: inline-block; */
  /* background: #111111; */
  color: #eeeeee;
  padding: 0 6px;
`

const Telegram = styled(ScTelegram)`
  vertical-align: middle;
  float: right;
`

const Facebook = styled(ScFacebook)`
  vertical-align: middle;
  float: right;
`

const Twitter = styled(ScTwitter)`
  vertical-align: middle;
  float: right;
`

export default ({ children }) => (
  <Heading>
    {children}
    <a href="https://telegram.me/cumatron_bot" target="_blank">
      <Telegram size="48" title="Telegram" />
    </a>
    <a href="https://facebook.com/cumatron.win" target="_blank">
      <Facebook size="48" title="Facebook" />
    </a>
    <a href="https://twitter.com/cumatron_win" target="_blank">
      <Twitter size="48" title="Twitter" />
    </a>
  </Heading>
)
