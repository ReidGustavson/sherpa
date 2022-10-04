import { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import HowItsMade from '../../pages/Section/Footer/HowItsMade';
import GameExplainer from '../../pages/Sudoku/GameExplainer/GameExplainer';

const BodyRoutes: FC = () => (
  <Routes>
    <Route path="/help" element={<GameExplainer/>}/>
    <Route path="/howItsMade" element={<HowItsMade/>}/>
    <Route path="/*" element={null}/>
  </Routes>
);

export default BodyRoutes;
