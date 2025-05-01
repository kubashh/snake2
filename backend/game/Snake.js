import { apples, data, boardSize, snakes } from "../lib/consts.js"
import {
  freePos,
  chance,
  randInt,
  createColor,
  isFreePos,
  numToPos,
  encode,
} from "../lib/utils.js"

export const isNickFree = (nick) => {
  // Check nick
  if (!nick || snakes.find((snake) => snake.nick === nick))
    return { message: `Choose other nick` }

  return { success: true }
}

const del = (snake) => {
  for (const bodyElement of snake.body) {
    if (bodyElement != snake.head() && isFreePos(bodyElement) && chance(0.4))
      apples.push(bodyElement)
  }
  snakes.splice(snakes.indexOf(snake), 1)

  snake.socket.emit(`end`)
}

export class Snake {
  nick
  color
  direction
  socket
  body

  constructor(nick, socket) {
    this.nick = nick
    this.color = createColor()
    this.direction = randInt(0, 4)
    this.socket = socket

    const nbf = freePos(3)
    this.body = [nbf, nbf, nbf]

    snakes.push(this)
  }

  head() {
    return this.body.at(-1)
  }

  changeDirection(direction) {
    if ((this.direction - direction) % 2 !== 0) this.direction = direction
  }

  collide(pos) {
    const { x, y } = numToPos(pos)
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
      del(this)
      return true
    }

    for (const snake of snakes) {
      if (snake === this) continue

      for (const pos2 of snake.body) {
        if (pos2 === pos) {
          del(this)
          return true
        }
      }
    }
  }

  move() {
    let newHead = this.head()

    switch (this.direction) {
      case 0:
        newHead += 1
        break
      case 1:
        newHead += 256
        break
      case 2:
        newHead -= 1
        break
      default:
        newHead -= 256
    }

    if (this.collide(newHead)) return

    let condition = true
    for (let i = 0; i < apples.length; i++) {
      if (newHead === apples[i]) {
        apples.splice(i, 1)

        condition = false
        break
      }
    }

    if (condition) this.body.shift()

    this.body.push(newHead)
  }

  sendData() {
    const dataToSend = `${encode(this.head())}${data.board}`

    this.socket.emit(`board`, dataToSend)
  }
}
