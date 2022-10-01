export interface SudokuDayState {
  day: string
  currentGame: SudokuGameState
  games: SudokuGameState[]
}

export interface SudokuGameState {
  solved: boolean
  gameSize: number
  nullCubes: number
  gameDetails: CubeDetails[]
}

export interface CubeDetails {
  index: number
  colorIndex: number
  given: boolean
}
