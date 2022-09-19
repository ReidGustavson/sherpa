import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PageNotFound from "../../pages/pageNotFound";
import PrivatePage from "../../pages/PrivatePage";
import SignInPage from "../../pages/SignInPage";
import PrivateOutlet from "../PrivateOutlet/PrivateOutlet";

const BodyRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signin" element={<SignInPage/>}/>
    <Route path="/private" element={<PrivateOutlet/>}>
      <Route path="/private" element={<PrivatePage/>}/>
    </Route>
    <Route path="/*" element={<PageNotFound/>}/>
  </Routes>
);

export default BodyRoutes;
