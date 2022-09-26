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

export function newRandomGame(gameDimension: number) : number[]{
  if (gameDimension < 1 || gameDimension > 5) return []
  if (gameDimension === 1) return [0]
  const game = new Array(Math.pow(gameDimension, 3)).fill(gameDimension)
  const possiblePlaces = initializePossiblePlaces(gameDimension)
  
  for (let placement=0; placement < Math.pow(gameDimension, 2); placement++) {
    for(let color=0; color < gameDimension; color++) {
      const index = getRandomItem(possiblePlaces.get(color) ?? new Set())
      if (index === undefined) {
        console.log('FUCKING FUCK!!!!')
      }
      game[index] = color
      for (let otherColor=0; otherColor < gameDimension; otherColor++) {
        possiblePlaces.get(otherColor)?.delete(index)
      }
      const indexesToRemove = getIndexesInLineWithIndex(index, gameDimension)
      for (const indexForRemoval of indexesToRemove) {
        possiblePlaces.get(color)?.delete(indexForRemoval)
      }
    }
  }
  return game
}

function initializePossiblePlaces(gameDimension: number) {
  const possiblePlaces = new Map<number,Set<number>>()
  const fullArrayOfIndexes = Array.from(Array(Math.pow(gameDimension, 3)).keys());
  for(let color=0; color < gameDimension; color++) {
    possiblePlaces.set(color, new Set(fullArrayOfIndexes))
  }
  return possiblePlaces
}

function getRandomItem(set: Set<number>): number {
  const items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

export function getIndexesInLineWithIndex(index: number, gameDimension: number): number[] {
  const row = index % gameDimension
  const column = Math.floor(index/gameDimension) % gameDimension
  const depth = Math.floor(index/Math.pow(gameDimension, 2)) % gameDimension
  const indexes = new Set<number>()
  for (let i=0; i < gameDimension; i++) {
    indexes.add(i + column * gameDimension + depth * gameDimension * gameDimension)
    indexes.add(row + i * gameDimension + depth * gameDimension * gameDimension)
    indexes.add(row + column * gameDimension + i * gameDimension * gameDimension)
  }
  return Array.from(indexes)
}

function validRows(dim: number): number[][] {
  switch(dim) {
    case 3: 
      return [[1,2,0],[1,0,2],[2,1,0],[2,0,1],[0,1,2],[0,2,1]]
    case 4:
      return [[1,2,3,0],[1,2,0,3],[1,3,2,0],[1,3,0,2],[1,0,2,3],[1,0,3,2],[2,1,3,0],[2,1,0,3],[2,3,1,0],[2,3,0,1],[2,0,1,3],[2,0,3,1],[3,1,2,0],[3,1,0,2],[3,2,1,0],[3,2,0,1],[3,0,1,2],[3,0,2,1],[0,1,2,3],[0,1,3,2],[0,2,1,3],[0,2,3,1],[0,3,1,2],[0,3,2,1]]
    case 5: 
      return [[1,2,3,4,0],[1,2,3,0,4],[1,2,4,3,0],[1,2,4,0,3],[1,2,0,3,4],[1,2,0,4,3],[1,3,2,4,0],[1,3,2,0,4],[1,3,4,2,0],[1,3,4,0,2],[1,3,0,2,4],[1,3,0,4,2],[1,4,2,3,0],[1,4,2,0,3],[1,4,3,2,0],[1,4,3,0,2],[1,4,0,2,3],[1,4,0,3,2],[1,0,2,3,4],[1,0,2,4,3],[1,0,3,2,4],[1,0,3,4,2],[1,0,4,2,3],[1,0,4,3,2],[2,1,3,4,0],[2,1,3,0,4],[2,1,4,3,0],[2,1,4,0,3],[2,1,0,3,4],[2,1,0,4,3],[2,3,1,4,0],[2,3,1,0,4],[2,3,4,1,0],[2,3,4,0,1],[2,3,0,1,4],[2,3,0,4,1],[2,4,1,3,0],[2,4,1,0,3],[2,4,3,1,0],[2,4,3,0,1],[2,4,0,1,3],[2,4,0,3,1],[2,0,1,3,4],[2,0,1,4,3],[2,0,3,1,4],[2,0,3,4,1],[2,0,4,1,3],[2,0,4,3,1],[3,1,2,4,0],[3,1,2,0,4],[3,1,4,2,0],[3,1,4,0,2],[3,1,0,2,4],[3,1,0,4,2],[3,2,1,4,0],[3,2,1,0,4],[3,2,4,1,0],[3,2,4,0,1],[3,2,0,1,4],[3,2,0,4,1],[3,4,1,2,0],[3,4,1,0,2],[3,4,2,1,0],[3,4,2,0,1],[3,4,0,1,2],[3,4,0,2,1],[3,0,1,2,4],[3,0,1,4,2],[3,0,2,1,4],[3,0,2,4,1],[3,0,4,1,2],[3,0,4,2,1],[4,1,2,3,0],[4,1,2,0,3],[4,1,3,2,0],[4,1,3,0,2],[4,1,0,2,3],[4,1,0,3,2],[4,2,1,3,0],[4,2,1,0,3],[4,2,3,1,0],[4,2,3,0,1],[4,2,0,1,3],[4,2,0,3,1],[4,3,1,2,0],[4,3,1,0,2],[4,3,2,1,0],[4,3,2,0,1],[4,3,0,1,2],[4,3,0,2,1],[4,0,1,2,3],[4,0,1,3,2],[4,0,2,1,3],[4,0,2,3,1],[4,0,3,1,2],[4,0,3,2,1],[0,1,2,3,4],[0,1,2,4,3],[0,1,3,2,4],[0,1,3,4,2],[0,1,4,2,3],[0,1,4,3,2],[0,2,1,3,4],[0,2,1,4,3],[0,2,3,1,4],[0,2,3,4,1],[0,2,4,1,3],[0,2,4,3,1],[0,3,1,2,4],[0,3,1,4,2],[0,3,2,1,4],[0,3,2,4,1],[0,3,4,1,2],[0,3,4,2,1],[0,4,1,2,3],[0,4,1,3,2],[0,4,2,1,3],[0,4,2,3,1],[0,4,3,1,2],[0,4,3,2,1]]
  }
  return []
}
