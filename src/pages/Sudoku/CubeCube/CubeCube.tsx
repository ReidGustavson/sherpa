// import { useFrame } from '@react-three/fiber';
import { FC, useContext } from 'react';
import { Vector3 } from 'three';
import Cube from '../Cube/Cube';
import { CubeDetails } from '../SudokuGame/SudokuGame';

interface CubeCubeProps {
  detailsForCubes: CubeDetails[],
  gameSize: number
}

const CubeCube: FC<CubeCubeProps> = ({detailsForCubes, gameSize}) => {
  //const {solved} = useContext(SudokuGameContext);
  //if (solved) {
    // useFrame(() => {
    //   if (msh.current?.rotation) {
    //     msh.current.rotation.x += 0.01
    // }})
  //}
  function getPosition(index: number): Vector3 {
    const offset = Math.floor(gameSize/2)
    const x = (index % gameSize - offset)
    const y = (Math.floor(index / gameSize) % gameSize - offset)
    const z = (Math.floor(index / (gameSize*gameSize)) % gameSize - offset )
    return new Vector3(x, y,z)
  }

  return (
    <>
      {
        detailsForCubes.map((cubeDetails, index) => 
          <Cube key={index} cubeDetails={cubeDetails} position={getPosition(index)}/>
        )
      }
    </>

  )
};


export default CubeCube;
