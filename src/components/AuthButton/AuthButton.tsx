import { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Auth/Auth';
import styles from './AuthButton.module.scss';

const AuthButton: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <button onClick={() => {
      if (auth.user) {
        auth.signout(() => navigate("/", {replace: true}));
      } else {
        navigate("/signin", {replace: true});
      }
    }} >
      Sign {auth.user ? 'out' : 'in'}
    </button>
  )
}

export default AuthButton;
