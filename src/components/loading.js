import React, { useState, useEffect } from "react"
import { useTransition, a } from "react-spring"
import { DefaultLoadingManager } from "three"

export default function Loading({ onLoad, isLoaded }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    DefaultLoadingManager.onLoad = () => onLoad(true)
    DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200)
  })

  const props = useTransition(isLoaded, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  })

  return props.map(
    ({ item: isLoaded, key, props: { opacity, width } }) =>
      !isLoaded && (
        <a.div
          key={key}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 90,
            opacity,
          }}
        >
          <div
            style={{
              width: "200px",
              height: "3px",
              backgroundColor: "yellow",
            }}
          >
            <a.div
              style={{
                height: "3px",
                backgroundColor: "orange",
                width,
              }}
            />
          </div>
        </a.div>
      )
  )
}
