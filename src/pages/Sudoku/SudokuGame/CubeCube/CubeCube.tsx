// import { useFrame } from '@react-three/fiber';
import { FC } from 'react';
import { Color, Vector3 } from 'three';
import Cube from './Cube/Cube';

interface CubeCubeProps {
  colors: (Color | null)[]
  indexes: number[]
  position: Vector3
}

const CubeCube: FC<CubeCubeProps> = ({colors, indexes, position}) => {
  console.log('Rerender CubeCube')
  const cubeSize = Math.cbrt(indexes.length)
  const offset = Math.floor(cubeSize/2)
  
  function getPosition(index: number){
    const x = (index % cubeSize) - offset
    const y = (Math.floor(index / cubeSize) % cubeSize) - offset
    const z = (Math.floor(index / (cubeSize*cubeSize)) % cubeSize) - offset
    if (indexes.length === 27) console.log('x: ', x, ' y: ', y, ' z: ', z )
    return new Vector3(x,y,z).add(position)
  }

  return (
    <>
    {
      indexes.map((cubeIndex, index) => 
        <Cube
          key={cubeIndex}
          index={cubeIndex}
          colors={colors}
          position={getPosition(index)}
          />
      )
    }
    </>
  )
};

export default CubeCube