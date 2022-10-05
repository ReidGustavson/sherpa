import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <Link to='/howItsMade'>{"How It's Made"}</Link>
      <a href='https://github.com/ReidGustavson/sherpa/tree/sudoku'>Source Code</a>
      <a href='https:/www.linkedin.com/in/reid-g'>LinkedIn</a>
    </div>
  )
}

export default Footer