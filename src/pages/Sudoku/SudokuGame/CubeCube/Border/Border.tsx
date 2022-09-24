import { FC, useContext, useRef } from 'react';

interface BorderProps {solved: boolean}

const Border: FC<BorderProps> = ({solved, ...props}) => {
  const msh = useRef<THREE.Mesh>(null);
  // const {status} = useContext(GameContext);
  // useFrame(() => {
  //   if (msh.current?.rotation) {
  //     msh.current.rotation.x += 0.01
  // }})
  return (
    <mesh
      {...props}
      ref={msh}>
      {/* <boxGeometry scale={(x: 10, y:10, z:10) => new THREE.BoxGeometry(x,z,y)} />
      <meshStandardMaterial color={hovered ? 'color' : 'green'}/> */}
    </mesh>
  )
}

export default Border;
