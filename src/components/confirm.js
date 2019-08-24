import React, { useState } from "react"
import { Transition } from "react-transition-group"
import styled from "styled-components"

const Confirmation = styled.div`
  /* animation */
  transition: 0.5s;
  transform: translateY(
    ${({ state }) =>
      state === "entering" || state === "entered" ? 0 : -4000}px
  );
  /* defaults */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(2, 2, 2, 0.98);
  text-align: center;
  font-family: "Org_v01";
`
const Text = styled.div`
  color: #fefefe;
  text-align: justify;
  padding: 100px 50px;
`

const Button = styled.button`
  background: rgba(0, 0, 0, 0);
  color: #fefefe;
`

export default () => {
  const [val, setVal] = useState(true)
  const handleClick = () => setVal(!val)

  return (
    <Transition in={val} timeout={500} unmountOnExit>
      {state => (
        <Confirmation state={state}>
          <Text>hola *.*</Text>
          <Button onClick={handleClick}>OK!</Button>
        </Confirmation>
      )}
    </Transition>
  )
}
