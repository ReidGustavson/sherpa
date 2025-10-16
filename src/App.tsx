import { FC, useEffect } from 'react'; 
import './App.scss';
import BodyRoutes from './components/BodyRoutes/BodyRoutes';
import { Provider } from 'react-redux'
import { store } from './redux/reduxStore';

const App: FC = () => {
  useEffect(() => {
    document.title = 'Sherpa';
  });

  return(
    <Provider store={store}>
      <div className="App">
        <div className='content'>
          <div className='body'><BodyRoutes/></div>
        </div>
      </div>
    </Provider>
  )
};

export default App