import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { CubeDetails } from '../SudokuGame/SudokuGame';

interface CubeProps { 
  cubeDetails: CubeDetails
  position: Vector3
}

const Cube: FC<CubeProps> = ({cubeDetails, position, ...props}) => {
  const msh = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      position={position}
      ref={msh}
      onClick={(_) => cubeDetails.onClick()}
      onPointerOver={(_) => setHover(true)}
      onPointerOut={(_) => setHover(false)}>
      <boxGeometry scale={(x: 10, y:10, z:10) => new THREE.BoxGeometry(x,z,y)} />
      <meshStandardMaterial 
        opacity={(!cubeDetails.color ? 0 : (cubeDetails.given ? 1 : (hovered ? .4 : .8)))} 
        color={cubeDetails.color ?? undefined}/>
    </mesh>
  )
};

export default Cube;
