import { FC } from "react";
import { Link } from "react-router-dom";
import styles from './SiteNavBar.module.scss';

const SiteNavBar: FC = () => {
  return (
    <div className={styles.SiteNavBar} data-testid="SiteNavBar">
      <ul>
        <li>
          <Link to="/">Public</Link>
        </li>
        <li>
          <Link to="/private">Private</Link>
        </li>
        <li>
          <Link to="/sudoku">Sudoku</Link>
        </li>
      </ul>
    </div>
  );
}

export default SiteNavBar;
