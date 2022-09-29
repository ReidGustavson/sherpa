import { configureStore } from '@reduxjs/toolkit'
import sudokuReducer from '../pages/Sudoku/Redux/reducer'

export const store = configureStore({
  reducer: {
    sudoku: sudokuReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch