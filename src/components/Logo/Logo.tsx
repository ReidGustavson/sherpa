import { FC } from 'react';
import styles from './Logo.module.scss';

interface LogoProps {}

const Logo: FC<LogoProps> = () => (
  <div className={styles.Logo} data-testid="Logo">
    Logo Component
  </div>
);

export default Logo;
