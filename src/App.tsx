import { FC, useEffect } from 'react'; 
import './App.scss';
import AllRoutes from './components/AllRoutes/AllRoutes';
import SiteNavBar from './components/SiteNavBar/SiteNavBar';

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
    <div className="App">
      <div className='header'>{myDiv('sideOne')}</div>
      {/* <div className='header'>{<SiteNavBar/>}</div> */}
      <div className='content'>
        {true && <div className='leftsidenav'>{myDiv('sideOne')}</div>}
        {/* <div className='body'>{myDiv('sideOne')}</div> */}
        <div className='body'><AllRoutes/></div>
        {true && <div className='rightsidenav'>{myDiv('sideTwo')}</div>} 
      </div>
      <div className='footer'>{myDiv('footer')}</div>
    </div>
  )
};

export default App;
