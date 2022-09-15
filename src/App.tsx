import Header from './components/Header/Header';
import Sidenav from './components/Sidenav/Sidenav';
import Footer from './components/Footer/Footer';
import SiteBody from './components/SiteBody/SiteBody';
import { useEffect } from 'react';
import './App.scss';
import './grid.scss';

function App() {
  useEffect(() => {
    document.title = 'Sherpa';
  });
  return (
    <div className="App">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <div className='header'><Header/></div>
      <div className='body'><SiteBody/></div>
      <div className='leftsidenav'><Sidenav/></div>
      <div className='rightsidenav'><Sidenav/></div>
      <div className='footer'><Footer/></div>
    </div>
  );
}

export default App;
