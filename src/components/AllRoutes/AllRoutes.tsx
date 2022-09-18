import { FC } from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PrivatePage from "../../pages/PrivatePage";
import SignInPage from "../../pages/SignInPage";
import { ProvideAuth } from "../Auth/Auth";
import PrivateOutlet from "../PrivateOutlet/PrivateOutlet";

const AllRoutes: FC = () => (
  <ProvideAuth>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signin" element={<SignInPage/>}/>
    <Route path="/private" element={<PrivateOutlet/>}>
      <Route path="/private" element={<PrivatePage/>}/>
    </Route>
  </Routes>
  </ProvideAuth>
);

export default AllRoutes;
