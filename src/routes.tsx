import HomePage from './pages/HomePage';
import PageNotFound from './pages/pageNotFound';

const routes = {
  "/": {body: HomePage},
  "/*": {body: PageNotFound}
}

export default routes;