import React, { useState } from "react"
import { Transition } from "react-transition-group"
import styled from "styled-components"

const Confirmation = styled.div`
  /* base style */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(2, 2, 2, 0.98);
  text-align: center;
  font-family: "Org_v01";
  /* animation */
  transition: 0.5s;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
`
const Text = styled.div`
  color: #fefefe;
  text-align: justify;
  padding: 50px;
`

const Button = styled.button`
  background: rgba(0, 0, 0, 0);
  color: #fefefe;
  margin-bottom: 50px;
`

export default () => {
  const [val, setVal] = useState(true)
  const handleClick = () => setVal(!val)

  return (
    <Transition in={val} timeout={500} unmountOnExit mountOnEnter>
      {state => (
        <Confirmation state={state}>
          <Text>hola *.*</Text>
          <Button onClick={handleClick}>OK!</Button>
        </Confirmation>
      )}
    </Transition>
  )
}
