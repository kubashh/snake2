import { apples, boardSize, colorHash, snakes } from "./consts.js"

export const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min)

export const numToPos = (n) => ({
  x: Math.floor(n / 256),
  y: n - Math.floor(n / 256) * 256,
})

const randPos = (a = 0) =>
  randInt(a, boardSize - a) * 256 + randInt(a, boardSize - a)

const toHex = (n) => (n < 10 ? n.toString() : String.fromCharCode(65 - 10 + n))

export const chance = (a) => Math.random() < a

export const isFreePos = (pos) => {
  for (const pos2 of apples) {
    if (pos2 === pos) return false
  }

  for (const snake of snakes) {
    for (const pos2 of snake.body) {
      if (pos2 === pos) return false
    }
  }

  return true
}

export const freePos = (a = 0) => {
  let pos = randPos(a)

  while (!isFreePos(pos)) {
    pos = randPos(a)
  }

  return pos
}

const generateAppleCh = boardSize ** 2 * 0.00004
export const generateApple = () =>
  chance(generateAppleCh) &&
  apples.length < boardSize / 6 &&
  apples.push(freePos(2))

export const createColor = () => {
  const color = `${colorHash}${toHex(randInt(0, 16))}${toHex(
    randInt(0, 16)
  )}${toHex(randInt(0, 16))}`

  for (const snake of snakes) {
    if (snake.color === color) return createColor()
  }

  return color
}

export const encode = (n) => String.fromCharCode(n)
