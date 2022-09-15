import Section from './components/Section/Section';
import { useEffect, useState } from 'react';
import './App.scss';
import './grid.scss';

function App() {
  const [showSidenav, setShowSidenav] = useState(false);
  useEffect(() => {
    document.title = 'Sherpa';
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSidenav(!showSidenav);
    }, 2000);
  
    return () => clearInterval(interval);
  });
  

  return (
    <div className="App">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <div className='header'><Section name='Header'/></div>
      <div className='body'><Section name='Body'/></div>
      {showSidenav && <div className='leftsidenav'><Section name='Sidenav 1'/></div>}
      {showSidenav && <div className='rightsidenav'><Section name='Sidenav 2'/></div>} 
      <div className='footer'><Section name='footer'/></div>
    </div>
  );
}

export default App;
