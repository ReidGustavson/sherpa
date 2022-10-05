import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Sudoku from "../../pages/Sudoku/Sudoku.lazy";

const BodyRoutes: FC = () => (
  <Routes>
    <Route path="/*" element={<Sudoku/>}/>
  </Routes>
);

export default BodyRoutes;
