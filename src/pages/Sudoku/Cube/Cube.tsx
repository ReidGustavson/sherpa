import { FC, useContext, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { CubeDetails } from '../SudokuGame/SudokuGame';

interface CubeProps { 
  cubeDetails: CubeDetails
  position: Vector3
}

const Cube: FC<CubeProps> = ({cubeDetails, position, ...props}) => {
  console.log('SCARED');
  //const {solved} = useContext(SudokuGameContext);
  //if (solved) {
    // useFrame(() => {
    //   if (msh.current?.rotation) {
    //     msh.current.rotation.x += 0.01
    // }})
  //}
  const [opacity, setOpacity] = useState(!cubeDetails.color ? 0 : (cubeDetails.given ? 1 : .8))

  function handleClick() {
    cubeDetails.onClick()
    if (!cubeDetails.given) {
      setOpacity(!cubeDetails.color ? 0 : .8)
    }
  }
  
  function handleHover(over: boolean) {
    if (cubeDetails.color && !cubeDetails.given) {
      setOpacity(over ? .8 : .4)
    }
  }

  return (
    <mesh
      {...props}
      position={position}
      onClick={(_) => handleClick()}
      onPointerOver={(_) => handleHover(true)}
      onPointerOut={(_) => handleHover(false)}>
      <boxGeometry scale={(x: 10, y:10, z:10) => new THREE.BoxGeometry(x,z,y)} />
      <meshStandardMaterial transparent opacity={opacity} color={cubeDetails.color ?? 'white'}/>
    </mesh>
  )
};

export default Cube;
