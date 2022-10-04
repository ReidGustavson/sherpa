import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PageNotFound from "../../pages/pageNotFound";
import PrivatePage from "../../pages/PrivatePage";
import SignInPage from "../../pages/SignInPage";
import Sudoku from "../../pages/Sudoku/Sudoku.lazy";
import PrivateOutlet from "../PrivateOutlet/PrivateOutlet";

const BodyRoutes: FC = () => (
  <Routes>
    {/* <Route path="/" element={<HomePage/>}/>
    <Route path="/signin" element={<SignInPage/>}/>
    <Route element={<PrivateOutlet/>}>
      <Route path="/private" element={<PrivatePage/>}/>
    </Route>
    <Route path="/sudoku/*" element={<Sudoku/>}/> */}
    <Route path="/*" element={<Sudoku/>}/>
  </Routes>
);

export default BodyRoutes;
