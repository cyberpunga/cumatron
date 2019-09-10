import React from "react"
import styled from "styled-components"

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-family: Org_v01;
`

export default ({ children }) => <Footer>{children}</Footer>
