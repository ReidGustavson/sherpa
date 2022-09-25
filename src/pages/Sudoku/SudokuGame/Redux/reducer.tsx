import { ActionTypes} from "./actions";
import { Action } from 'redux';
import { SudokuGameState } from "./store";
import type { Reducer } from '@reduxjs/toolkit'
import { checkForSolve } from "../CubeMath";

interface ActionPayload extends Action<ActionTypes> {
  payload?: unknown
}

const sudokuReducer : Reducer = (state: SudokuGameState, action: ActionPayload) => {
  switch (action.type) {
    case ActionTypes.CLICK_CUBE:
      return clickCube(JSON.parse(JSON.stringify(state)), action.payload as number)
    default:
      return state
  }
}

export function clickCube(state: SudokuGameState, index: number): SudokuGameState {
  const gameSize = Math.cbrt(state.cubeDetails.length) 
  if (!state.solved && !state.cubeDetails[index].given) {
    if (state.cubeDetails[index].colorIndex === gameSize) {
      state.nullCubes--
    }

    state.cubeDetails[index].colorIndex = ++state.cubeDetails[index].colorIndex % (gameSize + 1)
    if (state.cubeDetails[index].colorIndex === gameSize) {
      state.nullCubes++
    }
    return checkForWin(state)
  }
  return state
}

function checkForWin(state: SudokuGameState): SudokuGameState {
  if (state.nullCubes > 0) {
    state.solved = false
    return state
  }

  state.solved = checkForSolve(state.cubeDetails.map(x => x.colorIndex))
  return state
}

export default sudokuReducer

