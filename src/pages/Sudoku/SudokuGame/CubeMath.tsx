export function getCubeIndexes(gameDimension: number) {
  return innerCubeIndexes(Array.from(Array(Math.pow(gameDimension, 3)).keys()))
}

function innerCubeIndexes(cubeIndexes: number[]): number[][] {
  const cubeDimension = Math.cbrt(cubeIndexes.length)
  if (cubeDimension < 3) {
    return [cubeIndexes]
  }
  const innerCube: number[] = []
  for (let i=1; i < cubeDimension - 1; i++) {
    for (let j=1; j < cubeDimension - 1; j++) {
      for (let k=1; k < cubeDimension - 1; k++) {
        innerCube.push(cubeIndexes[k + j*cubeDimension + i*cubeDimension*cubeDimension])
      }
    }
  }
  return [cubeIndexes, ...innerCubeIndexes(innerCube)]
}

export function checkForSolve(state: number[]): boolean {
  const gameSize = Math.cbrt(state.length)
  for (let i=0; i < gameSize; i++) {
    for (let j=0; j < gameSize; j++) {
      const row = new Set()
      const column = new Set()
      const depth = new Set()
      for (let k=0; k < gameSize; k++) {
        row.add(state[i*gameSize*gameSize + j*gameSize + k])
        column.add(state[i*gameSize*gameSize + j + k*gameSize])
        depth.add(state[i*gameSize + j + k*gameSize*gameSize])
      }
      for (const dimension of [row, column, depth]) {
        if (dimension.has(gameSize) || dimension.size < gameSize) {
          return false
        }
      }
    }
  }
  return true
}
