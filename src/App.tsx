import { FC, useEffect } from 'react'; 
import './App.scss';
import BodyRoutes from './components/BodyRoutes/BodyRoutes';
import RSNRoutes from './components/RSNRoutes/RSNRoutes';
import { Provider } from 'react-redux'
import { store } from './redux/reduxStore';
import Footer from './pages/Section/Footer/Footer';

const App: FC = () => {
  useEffect(() => {
    document.title = 'Sherpa';
  });

  return(
    <Provider store={store}>
      <div className="App">
        <div className='content'>
          <div className='body'><BodyRoutes/></div>
          <div className='rightsidenav'><RSNRoutes/></div>
        </div>
        <div className='footer'><Footer/></div>
      </div>
    </Provider>
  )
};

export default App