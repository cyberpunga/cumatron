import React, { useState } from "react"

const Confirm = props => {
  const [val, setVal] = useState(false)
  const handleClick = () => setVal(!val)
  return !val ? (
    <div
      style={{
        position: "absolute",
        width: `100%`,
        height: `100%`,
        top: 0,
        left: 0,
        background: "rgba(2,2,2,.98)",
        textAlign: `center`,
        fontFamily: `Org_v01`,
      }}
    >
      <div
        style={{
          color: `#fefefe`,
          textAlign: `justify`,
          padding: 100,
        }}
      >
        hola *.*
      </div>
      <button
        style={{
          background: `rgba(0,0,0,0)`,
          color: `#fefefe`,
        }}
        onClick={handleClick}
      >
        OK
      </button>
    </div>
  ) : null
}

export default Confirm
