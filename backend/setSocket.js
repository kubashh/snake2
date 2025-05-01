import { isNickFree, Snake } from "./game/Snake.js"

export const setSocket = (socket) => {
  let snake = null

  socket.on(`new`, (nick) => {
    const data = isNickFree(nick)
    if (data.success) {
      snake = new Snake(nick, socket)
    }
    socket.emit(`new`, data)
  })

  socket.on(`direction`, (direction) => {
    snake?.changeDirection(direction)
  })
}
