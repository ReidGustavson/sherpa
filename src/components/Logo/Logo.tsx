import { FC } from 'react';
import styles from './Logo.module.scss';

interface LogoProps {
  imgSource: string;
}

const Logo: FC<LogoProps> = (props) => (
  <div className={styles.Logo} data-testid="Logo">
    <img src={props.imgSource} alt="Logo"/>
  </div>
);

export default Logo;
