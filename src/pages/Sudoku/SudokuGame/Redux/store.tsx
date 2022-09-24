import { FC, useState } from 'react'
import { Provider } from 'react-redux'
import sudokuReducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'

export interface CubeDetails {
  colorIndex: number
  given: boolean
  index: number
}

export interface SudokuGameState {
  solved: boolean
  nullCubes: number
  cubeDetails: CubeDetails[]
}

type SudokuStoreProps = {
  gameSize: number
  children: React.ReactNode;
  colorIndexes: number[]
}

export const SudokuStore: FC<SudokuStoreProps> = ({gameSize, colorIndexes, children}) => {
  // USE effect to configure store so that callback can dispose of store data?
  const [store] = useState(configureStore({reducer: sudokuReducer, preloadedState: initialState()}))

  function initialState() : SudokuGameState {
    return {
      cubeDetails: cubeDetails(),
      solved: false,
      nullCubes: colorIndexes.filter(x => x === gameSize).length
    }
  }

  function cubeDetails() : CubeDetails[] {
    return colorIndexes.map((value, index) => (
      { colorIndex: value, given: value !== gameSize, index: index }
    ))
  }

  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default SudokuStore;