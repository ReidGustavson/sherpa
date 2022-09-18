import { FC } from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { ProvideAuth } from "../Auth/Auth";
import AuthButton from "../AuthButton/AuthButton";
import styles from './SiteNavBar.module.scss';

const SiteNavBar: FC = () => {
  return (
    <div className={styles.SiteNavBar} data-testid="SiteNavBar">
      <ProvideAuth>
        <Router>
          <div>
            <AuthButton />
            <ul>
              <li>
                <Link to="/">Public Page</Link>
              </li>
              <li>
                <Link to="/private">Protected Page</Link>
              </li>
            </ul>
          </div>
        </Router> 
      </ProvideAuth>
    </div>
  );
}

export default SiteNavBar;
