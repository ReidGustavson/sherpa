import { CubeDetails } from "../SudokuGame/SudokuGame"

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
