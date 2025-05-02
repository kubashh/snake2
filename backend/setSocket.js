import { isNickFree, Snake } from "./game/Snake.js"

const newRes = (isValid) =>
  isValid ? { success: true } : { message: `Choose other nick` }

export const setSocket = (socket) => {
  let snake = null

  socket.on(`new`, (nick) => {
    const isValid = isNickFree(nick)
    if (isValid) snake = new Snake(nick, socket)

    socket.emit(`new`, newRes(isValid))
  })

  socket.on(`direction`, (direction) => {
    snake?.changeDirection(direction)
  })
}
