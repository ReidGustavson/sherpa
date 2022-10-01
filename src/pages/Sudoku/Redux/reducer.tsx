import { ActionTypes } from "./actions";
import { Action } from 'redux';
import type { Reducer } from '@reduxjs/toolkit'
import { checkForSolve } from "../SudokuGame/CubeMath";
import { SudokuDayState, SudokuGameState, CubeDetails } from "../models";

interface ActionPayload extends Action<ActionTypes> {
  payload?: unknown
}

function getDateString() {
  return new Date().toISOString().slice(0, 10).replace("-","")
}

export const initialState = () => { 
  return {
    day: getDateString(),
    currentGame: {gameSize: 3, gameDetails: [], nullCubes: 0, solved: false},
    games: [] as SudokuGameState[]
  }
}

function copyObject<T>(obj: unknown): T {
  return JSON.parse(JSON.stringify(obj))
}

const sudokuReducer : Reducer = (state: SudokuDayState = initialState(), action: ActionPayload) => {
  if (state.day !== getDateString()) {
    const currentGame = {gameDetails: [], nullCubes: 0, solved: false, gameSize: state.currentGame.gameSize}
    return {day: getDateString(), games: [], currentGame: currentGame}
  }
  
  switch (action.type) {
    case ActionTypes.CLICK_CUBE:
      return {...state, currentGame: clickCube(copyObject<SudokuGameState>(state.currentGame), action.payload as number)}
    case ActionTypes.SET_GAME:
      return {...state, currentGame: setGame(action.payload as CubeDetails[])}
    case ActionTypes.SET_GAME_SIZE:
      return setGameSize(copyObject<SudokuDayState>(state), action.payload as number)
    case ActionTypes.RESET_GAME:
      return {...state, currentGame: resetGame(copyObject<SudokuGameState>(state.currentGame))}
    default:
      return state
  }
}

function resetGame(state: SudokuGameState): SudokuGameState {
  state.gameDetails.forEach(x => {if (!x.given) x.colorIndex = state.gameSize})
  return state
}

function setGameSize(state: SudokuDayState, gameSize: number) {
  let newCurrentGame = state.games.find((game: SudokuGameState) => game.gameSize === gameSize)
  newCurrentGame = newCurrentGame ?? {gameDetails: [], nullCubes: 0, solved: false, gameSize: gameSize}
  const newGamesList = state.games.filter((game: SudokuGameState) => game.gameSize !== gameSize)
  if (state.currentGame.gameDetails.length > 0) {
    newGamesList.push(state.currentGame)
  }
  state.currentGame = newCurrentGame
  state.games = newGamesList
  return state
}



function setGame(gameDetails: CubeDetails[]): SudokuGameState {
  const nullCubes = gameDetails?.filter(cube => cube.colorIndex === Math.cbrt(gameDetails.length)).length ?? 0
  const gameState = {
    gameDetails: gameDetails?.map(x => {return {index: x.index, given: x.given, colorIndex: x.colorIndex}}) ?? [],
    solved: false,
    nullCubes: nullCubes,
    gameSize: Math.cbrt(gameDetails?.length)
  }
  if (nullCubes === 0) {
    checkForWin(gameState)
  }
  return gameState
}

function clickCube(gameState: SudokuGameState, index: number): SudokuGameState {
  if (!gameState.solved && !gameState.gameDetails[index].given) {
    if (gameState.gameDetails[index].colorIndex === gameState.gameSize) {
      gameState.nullCubes--
    }

    gameState.gameDetails[index].colorIndex = ++gameState.gameDetails[index].colorIndex % (gameState.gameSize + 1)
    if (gameState.gameDetails[index].colorIndex === gameState.gameSize) {
      gameState.nullCubes++
    }
    checkForWin(gameState)
  }
  return gameState
}

function checkForWin(state: SudokuGameState) {
  if (state.nullCubes > 0) {
    state.solved = false
  }
  state.solved = checkForSolve(state.gameDetails.map(x => x.colorIndex))
}

export default sudokuReducer

