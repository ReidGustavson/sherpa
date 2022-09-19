import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/Auth/Auth";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const login = () => {
    auth.signin(() => {
      navigate(location?.state?.from ?? '/');
    });
  };

  return (
    <div>
      <p>You must log in to view {location?.state?.from ? 'page ' + location.state.from : 'this page'}.</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default SignIn;
