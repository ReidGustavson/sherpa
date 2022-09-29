import { CubeDetails } from "../SudokuGame/SudokuGame"

export enum ActionTypes {
  CLICK_CUBE,
  SET_GAME,
  SET_GAME_SIZE
}

export const click_cube = (index: number) => {
  return {
    type: ActionTypes.CLICK_CUBE,
    payload: index
  }
}

export const set_game = (game_details: CubeDetails[]) => {
  return {
    type: ActionTypes.SET_GAME,
    payload: game_details
  }
}

export const set_game_size = (game_size: number) => {
  return {
    type: ActionTypes.SET_GAME_SIZE,
    payload: game_size
  }
}
