import {
  useNavigate,
  useLocation
} from "react-router-dom";
import { useAuth } from "../components/Auth/Auth";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: "/" } };
  const login = () => {
    auth.signin(() => {
      navigate(from, {replace: false});
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default SignIn;
