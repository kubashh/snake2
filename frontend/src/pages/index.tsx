"use client"

import { Menu } from "@/components/Menu"
import { data } from "@/lib/consts"
import { useRefresh } from "@/lib/hooks"
import { useEffect } from "react"

export default function Home() {
  // Direction
  let lastDirection: any = null

  const changeDirection = (direction: any) => {
    if (lastDirection && lastDirection % 2 === direction % 2) return

    lastDirection = direction

    data.socket.emit(`direction`, direction)
  }

  useEffect(() => {
    document.addEventListener(`keydown`, ({ key }) => {
      if (!data.inGame) return

      switch (key.toLowerCase()) {
        case `w`:
          return changeDirection(0)
        case `d`:
          return changeDirection(1)
        case `s`:
          return changeDirection(2)
        case `a`:
          return changeDirection(3)
      }
    })
  }, [])

  const refresh = useRefresh()
  data.refresh = refresh

  return (
    <>
      <Menu />
      <main>
        <h1>Hello world!</h1>
      </main>
    </>
  )
}
