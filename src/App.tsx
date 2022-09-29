import { FC, useEffect, useState } from 'react'; 
import './App.scss';
import BodyRoutes from './components/BodyRoutes/BodyRoutes';
import RSNRoutes from './components/RSNRoutes/RSNRoutes';
import { ProvideAuth } from './components/Auth/Auth';
import { Provider } from 'react-redux'
import Header from './pages/Section/Header/Header';
import { withCookies } from 'react-cookie';
import sudokuReducer from './pages/Sudoku/Redux/reducer';
import { configureStore } from '@reduxjs/toolkit'

const myDiv  = (word: string) => {
  return (
    <div> {word} </div>
  )
}

const App: FC = () => {
  useEffect(() => {
    document.title = 'Sherpa';
  });

  return(
    <ProvideAuth>
      <Provider store={configureStore({reducer: sudokuReducer})}>
        <div className="App">
          <div className='header'>{<Header logoSource='logo192.png'/>}</div> 
          <div className='content'>
            {true && <div className='leftsidenav'>{myDiv('sideOne')}</div>}
            <div className='body'><BodyRoutes/></div>
            {true && <div className='rightsidenav'><RSNRoutes/></div>} 
          </div>
          <div className='footer'>{myDiv('footer')}</div>
        </div>
      </Provider>
    </ProvideAuth>
  )
};

export default withCookies(App);
