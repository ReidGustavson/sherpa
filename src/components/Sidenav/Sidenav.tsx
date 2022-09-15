import { FC } from 'react';
import styles from './Sidenav.module.scss';

const Sidenav: FC = () => (
  <div className={styles.Sidenav}  data-testid="Sidenav">
    Sidenav Component
  </div>
)

export default Sidenav;
