import { CubeDetails } from "../SudokuGame/SudokuGame"

export interface SudokuGameState {
  solved: boolean
  gameSize: number
  nullCubes: number
  gameDetails: CubeDetails[]
}
