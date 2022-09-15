import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => (
  <div className={styles.Header} data-testid="Header">
    Header Component
  </div>
);

export default Header;
