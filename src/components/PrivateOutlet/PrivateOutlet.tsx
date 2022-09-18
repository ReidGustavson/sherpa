import { useAuth } from "../Auth/Auth";
import { Outlet, Navigate} from "react-router-dom";

function PrivateOutlet() {
  const auth = useAuth();

  return auth.user.length > 0 ? <Outlet /> : <Navigate replace to={{pathname: "/signin"}}/>;
}

export default PrivateOutlet;
