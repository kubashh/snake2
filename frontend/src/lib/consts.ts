"use client"

import { connect } from "socket.io-client"
import { render } from "./utils"

const adress = `https://literate-lamp-wrgwx4wpwgx3g9gw-4000.app.github.dev`
export const data = {
  inGame: false,

  user: { nick: ``, color: `black` },

  socket: connect(adress),
  ctx: {
    fillStyle: ``,
    fillRect: (x: number, y: number, w: number, h: number) => {},
    canvas: { width: 0, height: 0 },
  },
  refresh: () => {},

  pixelSize: 40,
  boardSize: 0,
  appleColor: ``,
}

// Connect
data.socket.on(`connect`, () => data.refresh())

// Disconnect
data.socket.on(`disconnect`, () => data.refresh())

// Static
data.socket.on(`static`, ({ boardSize, appleColor }) => {
  data.boardSize = boardSize
  data.appleColor = appleColor
})

// New
data.socket.on(`new`, ({ success, message }) => {
  if (success) {
    // Start game
    data.inGame = true
    data.refresh()
  } else {
    alert(message)
  }
})

// End
data.socket.on(`end`, () => {
  localStorage.setItem(`data`, JSON.stringify(data.user))

  data.inGame = false

  data.refresh()
})

// Board
data.socket.on(`board`, (dataFromBackend) => {
  if (!data.ctx.canvas) return

  const [head, ...board] = JSON.parse(dataFromBackend)

  render({ head, board })
})
