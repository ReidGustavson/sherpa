import Section from './components/Section/Section';
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
      <div className='header'><Section name='Header'/></div>
      <div className='body'><Section name='Body'/></div>
      <div className='leftsidenav'><Section name='Sidenav 1'/></div>
      <div className='rightsidenav'><Section name='Sidenav 2'/></div>
      <div className='footer'><Section name='footer'/></div>
    </div>
  );
}

export default App;
