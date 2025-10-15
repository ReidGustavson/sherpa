
import { FC, useState } from 'react'
import { Color, Vector3, DoubleSide } from 'three'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { click_cube } from 'src/pages/Sudoku/Redux/actions'
import { shallowEqual } from 'react-redux'
import { CubeDetails } from 'src/pages/Sudoku/models'
import { ThreeEvent } from '@react-three/fiber'

interface CubeProps {
  colors: Color[]
  position: Vector3
  index: number
}

const Cube: FC<CubeProps> = ({colors, index, position}) => {
  const cubeDetails: CubeDetails = useAppSelector((state) => state.sudoku.currentGame.gameDetails[index], shallowEqual)
  const solved = useAppSelector((state) => state.sudoku.currentGame.solved)
  const dispatch = useAppDispatch()
  const newOpacity = cubeDetails.colorIndex == null ? 0 : (cubeDetails.given ? 1 : .7)
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
    <mesh position={position} onClick={(e:ThreeEvent<MouseEvent>) => {e.stopPropagation(); handleClick()}}>
      <boxGeometry args={[.95,.95,.95]}/>
      <meshBasicMaterial 
        side={DoubleSide}
        transparent={newOpacity !== 1}
        opacity={opacity} 
        color={cubeDetails.colorIndex !== null ? colors[cubeDetails.colorIndex] : undefined}
        depthWrite={true}
        />
    </mesh>
  )
};

export default Cube
