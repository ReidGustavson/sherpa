import { FC } from "react";
import AuthButton from "../../../components/AuthButton/AuthButton";
import Logo from "../../../components/Logo/Logo"
import SiteNavBar from "../../../components/SiteNavBar/SiteNavBar";
import styles from './Header.module.scss';


interface HeaderProps {
  logoSource: string;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={styles.Header}>
      <Logo imgSource={props.logoSource}/>
      <AuthButton />
      <SiteNavBar/>
    </div>
  );
}

export default Header;
