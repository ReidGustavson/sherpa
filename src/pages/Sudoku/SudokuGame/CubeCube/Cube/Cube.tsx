import { FC, useState } from 'react'
import { Color, Vector3 } from 'three'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { click_cube } from '../../../Redux/actions'
import { shallowEqual } from 'react-redux'
import { CubeDetails } from '../../../models'
import * as THREE from 'three'

interface CubeProps {
  colors: (Color|null)[]
  position: Vector3
  index: number
}

const Cube: FC<CubeProps> = ({colors, index, position}) => {
  console.log('Rerender Cube')
  const cubeDetails: CubeDetails = useAppSelector((state) => state.sudoku.currentGame.gameDetails[index], shallowEqual)
  const solved = useAppSelector((state) => state.sudoku.currentGame.solved)
  const dispatch = useAppDispatch()
  const newOpacity = cubeDetails.colorIndex + 1 === colors.length ? 0 : (cubeDetails.given ? 1 : .8)
  const [opacity, setOpacity] = useState(newOpacity)
  
  if (opacity !== newOpacity) {
    setOpacity(newOpacity)
  }

  function handleClick() {
    if (!solved) {
      dispatch(click_cube(index))
    }
  }

  return (
  <mesh position={position} onClick={e => {e.stopPropagation(); handleClick()}}>
    <boxGeometry args={[.95,.95,.95]}/>
    <meshBasicMaterial 
      side={THREE.DoubleSide}
      transparent={newOpacity != 1}
      opacity={opacity} 
      color={colors[cubeDetails.colorIndex] ?? undefined}
      depthWrite={true}
      />
  </mesh>
  )
};

export default Cube
