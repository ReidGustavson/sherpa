import { ActionTypes } from "./actions";
import { Action } from 'redux';
import type { Reducer } from '@reduxjs/toolkit'
import { checkForSolve } from "../SudokuGame/CubeMath";
import { SudokuGameState } from "./gameState";
import { CubeDetails } from "../SudokuGame/SudokuGame";

interface ActionPayload extends Action<ActionTypes> {
  payload?: unknown
}
const initialState = {
  gameSize: 0,
  gameDetails: [] as CubeDetails[],
  solved: false,
  nullCubes: 0
};

const sudokuReducer : Reducer = (state: SudokuGameState = initialState, action: ActionPayload) => {
  console.log("I'm in the reducer yo")
  switch (action.type) {
    case ActionTypes.CLICK_CUBE:
      return clickCube(JSON.parse(JSON.stringify(state)), action.payload as number)
    case ActionTypes.SET_GAME:
      return setGame(action.payload as CubeDetails[])
    case ActionTypes.SET_GAME_SIZE:
      return setGameSize(state, action.payload as number)
    default:
      return state
  }
}

export function setGameSize(state: SudokuGameState, gameSize: number) {
  if (state.gameSize === gameSize) {
    return state
  }
// const date = new Date().toDateString()
//     if (cookies['today-sudoku-levels']?.day !== date) {
//       removeCookie('today-sudoku-levels')
//     } else if (cookies['today-sudoku-levels'][gameSize]) {
//       setGame(cookies['today-sudoku-levels'][gameSize])
//       return
//     }
//     API.get(ApiName, path + '/' + gameSize, {}).then(response => {
//       const gameDetails = response.values.map((x: number, i: number) => {
//         return {colorIndex: x, index: i, given: x < gameSize}
//       })
//       setCookie('today-sudoku-levels', {
//         ...cookies, 
//         day: date,
//         [gameSize]: gameDetails
//       })
//       setGame(response.values)
//     })
//     setLoading(true)
  return {
    gameSize: gameSize,
    solved: false,
    gameDetails: [] as CubeDetails[],
    nullCubes: 0
  }
}

export function setGame(gameDetails: CubeDetails[]) {
  console.log(gameDetails)
  const nullCubes = gameDetails?.filter(cube => cube.colorIndex === Math.cbrt(gameDetails.length)).length ?? 0
  let gameState = {
    gameDetails: gameDetails?.map(x => {return {index: x.index, given: x.given, colorIndex: x.colorIndex}}) ?? [],
    solved: false,
    nullCubes: nullCubes,
    gameSize: Math.cbrt(gameDetails?.length)
  }
  if (nullCubes === 0) {
    gameState = checkForWin(gameState)
  }
  return gameState
}

export function clickCube(state: SudokuGameState, index: number): SudokuGameState {
  if (!state.solved && !state.gameDetails[index].given) {
    if (state.gameDetails[index].colorIndex === state.gameSize) {
      state.nullCubes--
    }

    state.gameDetails[index].colorIndex = ++state.gameDetails[index].colorIndex % (state.gameSize + 1)
    if (state.gameDetails[index].colorIndex === state.gameSize) {
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

  state.solved = checkForSolve(state.gameDetails.map(x => x.colorIndex))
  return state
}

export default sudokuReducer

