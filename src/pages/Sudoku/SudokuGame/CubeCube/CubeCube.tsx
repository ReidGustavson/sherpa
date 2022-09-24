// import { useFrame } from '@react-three/fiber';
import { FC } from 'react';
import { Color, Vector3 } from 'three';
import Cube from './Cube/Cube';

interface CubeCubeProps {
  colors: (Color|null)[]
  cubeIndexes: number[]
  position: Vector3
}

const CubeCube: FC<CubeCubeProps> = ({colors, cubeIndexes, position}) => {
  //if (solved) {
    // useFrame(() => {
    //   if (msh.current?.rotation) {
    //     msh.current.rotation.x += 0.01
    // }})
  //}
  const cubeSize = Math.cbrt(cubeIndexes.length)
  const offset = Math.floor(cubeSize/2)
  function getPosition(index: number){
    const x = (index % cubeSize - offset)
    const y = (Math.floor(index / cubeSize) % cubeSize - offset)
    const z = (Math.floor(index / (cubeSize*cubeSize)) % cubeSize - offset )
    return new Vector3(x,y,z).add(position)
  }

  return (
    <>
      {
        cubeIndexes.map((indexValue) => 
          <Cube
            key={indexValue}
            index={indexValue}
            colors={colors}
            position={getPosition(indexValue)}/>
        )
      }
    </>
  )
};

export default CubeCube;