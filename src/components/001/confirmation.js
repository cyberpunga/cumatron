import React from "react"
import { HTML } from "drei"

export default function Confirmation({ onPointerDown }) {
  const isSSR = typeof window === "undefined"
  return isSSR ? null : (
    <HTML
      center
      style={{
        width: 280,
        background: "#111111",
        color: "#eeeeee",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <p>
        cumatron necesita tu autorización para hablar a través de tu navegador
      </p>
      <button
        style={{
          background: "#111111",
          borderColor: "#eeeeee",
          color: "#eeeeee",
          fontFamily: "org_v01",
        }}
        onPointerDown={onPointerDown}
      >
        OK!
      </button>
    </HTML>
  )
}
