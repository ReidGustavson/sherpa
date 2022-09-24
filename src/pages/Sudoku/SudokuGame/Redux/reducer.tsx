import { ActionTypes} from "./actions";
import { Action } from 'redux';
import { SudokuGameState } from "./store";
import type { Reducer } from '@reduxjs/toolkit'

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

  const gameSize = Math.cbrt(state.cubeDetails.length)
  for (let i=0; i < gameSize; i++) {
    for (let j=0; j < gameSize; j++) {
      const row = new Set()
      const column = new Set()
      const depth = new Set()
      for (let k=0; k < gameSize; k++) {
        row.add(state.cubeDetails[i*gameSize*gameSize + j*gameSize + k].colorIndex)
        column.add(state.cubeDetails[i*gameSize*gameSize + j + k*gameSize].colorIndex)
        depth.add(state.cubeDetails[i*gameSize + j + k*gameSize*gameSize].colorIndex)
      }
      for (const dimension of [row, column, depth]) {
        if (dimension.has(gameSize) || dimension.size < gameSize) {
          state.solved = false
          return state
        }
      }
    }
  }
  state.solved = true
  return state
}

export default sudokuReducer

