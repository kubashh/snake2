import info from "../../public/info.json" assert { type: "json" }

export const boardSize = info.boardSize
export const appleColor = info.appleColor
export const colorHash = info.colorHash

export const data = { board: `` }

export const snakes = [] // : Snake[]
export const apples = [] // : number[]
