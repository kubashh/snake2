import { apples, data, snakes } from "../lib/consts.js"
import { encode, generateApple } from "../lib/utils.js"

const snakesMove = () => {
  for (const snake of snakes) {
    snake.move()
  }
}

const genetereBoard = () => {
  data.board = ``
  data.board = Object.keys(apples).reduce(
    (prev, e) => `${prev}${encode(e)}`,
    ``
  )

  for (const { body, color } of snakes) {
    data.board += color
    for (const pos of body) {
      data.board += encode(pos)
    }
  }
}

const sendBoard = () => {
  for (const snake of snakes) {
    snake.sendData()
  }
}

const update = () => {
  snakesMove()
  generateApple()
  genetereBoard()
  sendBoard()
}

export const start = () => {
  setInterval(update, 125 /* 1000 / 8 */)
}
