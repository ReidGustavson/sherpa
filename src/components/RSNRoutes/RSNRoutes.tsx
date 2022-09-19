import { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateOutlet from '../PrivateOutlet/PrivateOutlet';

const BodyRoutes: FC = () => (
  <Routes>
    <Route path="/" element="<div>Hello<div/>"/>
    <Route path="/signin" element={null}/>
    <Route path="/private" element={<PrivateOutlet/>}>
      <Route path="/private" element="<div>Nice<div/>"/>
    </Route>
    <Route path="/*" element="<div>Div<div/>"/>
  </Routes>
);

export default BodyRoutes;
