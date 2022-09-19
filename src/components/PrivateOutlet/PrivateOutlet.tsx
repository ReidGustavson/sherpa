import { useAuth } from "../Auth/Auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateOutlet = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth.user.length > 0 ? <Outlet /> : <Navigate replace={false} to={{pathname: "/signin"}} state={{from: location.pathname}}/>;
}

export default PrivateOutlet;
