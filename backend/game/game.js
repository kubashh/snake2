import { apples, data, snakes } from "../lib/consts.js"
import { encode, generateApple } from "../lib/utils.js"

const update = () => {
  // Snakes move
  for (const snake of snakes) {
    snake.move()
  }

  generateApple()

  // Generate board
  data.board = ``
  data.board = apples.reduce((prev, e) => `${prev}${encode(e)}`, ``)

  for (const { body, color } of snakes) {
    data.board += color
    for (const pos of body) {
      data.board += encode(pos)
    }
  }

  // Send board
  for (const snake of snakes) {
    snake.sendData()
  }
}

export const start = () => {
  setInterval(update, 125 /* 1000 / 8 */)
}
