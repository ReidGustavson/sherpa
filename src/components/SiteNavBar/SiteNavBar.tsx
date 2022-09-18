import { FC } from "react";
import { Link } from "react-router-dom";
import styles from './SiteNavBar.module.scss';

const SiteNavBar: FC = () => {
  return (
    <div className={styles.SiteNavBar} data-testid="SiteNavBar">
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/private">Protected Page</Link>
        </li>
      </ul>
    </div>
  );
}

export default SiteNavBar;
