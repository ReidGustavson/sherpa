import { FC } from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PrivatePage from "../../pages/PrivatePage";
import SignInPage from "../../pages/SignInPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const AllRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signin" element={<SignInPage/>}/>
    {/* <PrivateRoute rest={{rest: {path:"/private", element:<PrivatePage/>}}}/> */}
  </Routes>
);

export default AllRoutes;
