import { data } from "./consts"

const drawBox = (x: number, y: number, w: number, h: number, color: string) => {
  if (!data.ctx) return
  if (color) data.ctx.fillStyle = color

  data.ctx.fillRect(x, y, w, h)
}

const fillBackground = () => {
  const { width, height } = data.ctx.canvas
  drawBox(0, 0, width, height, `#008`)
}

const drawMapBorder = (middle: any, head: any) => {
  const { pixelSize, boardSize, ctx } = data

  let x = Math.floor(middle.x - head.x * pixelSize)
  let y = Math.floor(
    ctx.canvas.height - (middle.y - head.y * pixelSize) - boardSize * pixelSize
  )

  let a = boardSize * pixelSize
  let b = boardSize * pixelSize

  if (x < 0) {
    a += x
    x = 0
  }

  if (y < 0) {
    b += y
    y = 0
  }

  drawBox(x, y, a, b, `#000`)
}

export const render = ({ head, board }: any) => {
  const { pixelSize, appleColor, ctx } = data

  const { width, height } = ctx.canvas
  const px2 = pixelSize / 2

  fillBackground()

  const middle = {
    x: Math.floor(width / 2 - px2),
    y: Math.floor(height / 2 + px2),
  }

  drawMapBorder(middle, head)

  let color = appleColor

  for (const arr of board) {
    if (typeof arr === `string`) {
      color = arr
      continue
    }

    let [i, j] = arr

    i -= head.x
    j -= head.y
    const x = i * pixelSize + middle.x
    const y = -j * pixelSize + middle.y - 2 * pixelSize

    //if(-pixelSize < x && x < height + pixelSize && -pixelSize < y && y < width + pixelSize) {
    drawBox(x, y, pixelSize, pixelSize, color)
    //}
  }
}
