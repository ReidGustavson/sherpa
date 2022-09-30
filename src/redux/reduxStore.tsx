import { configureStore } from '@reduxjs/toolkit'
import sudokuReducer, { initialState } from '../pages/Sudoku/Redux/reducer'

const persistedState = localStorage.getItem('sudokuState') 
  ? JSON.parse(localStorage.getItem('sudokuState') ?? "{}")
  : initialState()

export const store = configureStore({
  reducer: { sudoku: sudokuReducer },
  preloadedState: { sudoku: persistedState }
})

store.subscribe(()=>{
  localStorage.setItem('sudokuState', JSON.stringify(store.getState().sudoku))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch