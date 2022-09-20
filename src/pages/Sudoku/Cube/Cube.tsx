import { FC, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Cube: FC = (props) => {
  const msh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame(() => {
    if (msh.current?.rotation) {
      msh.current.rotation.x += 0.01
  }})
  return (
    <mesh
      {...props}
      ref={msh}
      
      scale={active ? 1.5 : 1}
      onClick={(_) => setActive(!active)}
      onPointerOver={(_) => setHover(true)}
      onPointerOut={(_) => setHover(false)}>
      <boxGeometry scale={(x: 10, y:10, z:10) => new THREE.BoxGeometry(x,z,y)} />
      <meshStandardMaterial color={hovered ? 'blue' : 'green'}/>
      <ambientLight color='white'/>
    </mesh>
  )
};

export default Cube;
