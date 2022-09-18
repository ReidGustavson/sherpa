import { FC, useEffect } from 'react'; 
import './App.scss';
import AllRoutes from './components/AllRoutes/AllRoutes';
import { ProvideAuth } from './components/Auth/Auth';
import SiteNavBar from './components/SiteNavBar/SiteNavBar';
import Header from './pages/Section/Header/Header';

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
      <div className="App">
        <div className='header'>{<Header logoSource='logo192.png'/>}</div> 
        <div className='content'>
          {true && <div className='leftsidenav'>{myDiv('sideOne')}</div>}
          <div className='body'><AllRoutes/></div>
          {true && <div className='rightsidenav'>{myDiv('sideTwo')}</div>} 
        </div>
        <div className='footer'>{myDiv('footer')}</div>
      </div>
    </ProvideAuth>
  )
};

export default App;
