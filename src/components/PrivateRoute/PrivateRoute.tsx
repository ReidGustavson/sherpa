import { useAuth } from "../Auth/Auth";
import { Route, Navigate} from "react-router-dom";
import { ReactNode } from "react";

interface Props extends JSX.IntrinsicAttributes {
  children?: ReactNode,
  rest:{
    rest: unknown;
    key?: React.Key | null | undefined;
  }
}

function PrivateRoute({ children, ...rest }: Props) {
  const auth = useAuth();
  const routerProps = {render: ({ location }: {location: unknown}) =>
    auth.user ? (
      children
    ) : (
      <Navigate replace to={{pathname: "/signin"}} state={{ from: location }}/>
    )
  };
  return (
    <Route {...routerProps} {...rest}/>
  );
}

export default PrivateRoute;
