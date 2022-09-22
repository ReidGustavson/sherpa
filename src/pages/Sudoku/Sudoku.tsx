import { FC } from 'react';
import { Canvas }  from '@react-three/fiber';
import { OrbitControls, Stars } from "@react-three/drei";
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';

const Sudoku: FC = () => {
  return (
    <div className={styles.Sudoku}>
      <Canvas color='0xff00ff'>
        <OrbitControls/>
        <Stars />
        <ambientLight color='0xffffff' intensity={.5}/>
        <spotLight position={[10,15,10]} angle={.8}/>
        <SudokuGame gameSize={3}/>
      </Canvas>
    </div>
  );
};

export default Sudoku;
