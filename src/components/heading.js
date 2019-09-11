import React from "react"
import styled from "styled-components"

const Heading = styled.h1`
  font-family: Org_v01;
  display: inline-block;
  background: #eeeeee;
  padding: 0 6px;
`

export default ({ children }) => <Heading>{children}</Heading>
