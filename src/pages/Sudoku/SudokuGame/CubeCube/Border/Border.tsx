import { FC } from 'react';
import * as THREE from 'three';
import { Color, Vector3} from 'three';
import { useAppSelector } from '../../../../../redux/hooks';

interface BorderProps {
  position: Vector3
}

const Border: FC<BorderProps> = ({position}) => {
  const solved = useAppSelector((state) => state.sudoku.currentGame.solved)

  const bars = [
    [0,1,1], [0,1,-1], [0,-1,1], [0,-1,-1],
    [1,0,1], [1,0,-1], [-1,0,1], [-1,0,-1],
    [1,1,0], [1,-1,0], [-1,1,0], [-1,-1,0]
  ]

  return (
    <>{
      bars.map((place: number[]) => makeOneBar(solved, position, place[0],place[1], place[2]))
    }</>
    
    
  )
}

function makeOneBar(solved: boolean, position:Vector3, x:number, y:number, z:number) {
  const newVector = new Vector3(x*.5, y*.5, z*.5)
  const newPosition = new Vector3(newVector.x + position.x, newVector.y+position.y, newVector.z + position.z)
  const length = x === 0 ? 1 : .05;
  const width = y === 0 ? 1 : .05;
  const height = z === 0 ? 1 : .05;
  return (
    <mesh
      key={newPosition.toArray().toString()} 
      position={newPosition}>
      <boxGeometry args={[length,width,height]}/>
      <meshBasicMaterial 
        side={THREE.DoubleSide}
        transparent={false} 
        color={solved ? new Color('gold'): new Color('purple')}
        depthWrite={true}
      />
    </mesh>
  )
}


export default Border;
