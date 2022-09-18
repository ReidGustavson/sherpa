import { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Auth/Auth';
import styles from './AuthButton.module.scss';

const AuthButton: FC = () => {
  const navigate = useNavigate();
  const {user, signin, signout} = useAuth();

  return (
    <button className={styles.AuthButton} onClick={() => {
      if (user !== "") {
        signout(() => {
          navigate("/", {replace: true})
        });
      } else {
        navigate("/signin", {replace: false});
      }
    }} >
      Sign {user === "" ? 'in' : 'out'}
    </button>
  )
}

export default AuthButton;
