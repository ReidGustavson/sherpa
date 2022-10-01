import { FC, useState } from 'react'
import { Color, Vector3 } from 'three'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { click_cube } from '../../../Redux/actions'
import { shallowEqual } from 'react-redux'
import { CubeDetails } from '../../../models'

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
  
  // function handleHover(over: boolean) {
  //   if (cubeDetails.color && !cubeDetails.given) {
  //      setOpacity(over ? .9 : .8)
  //   }
  // }

  return (
    <>
      {/* <mesh position={position}>
        <boxGeometry parameters={{width: 10, height: 10, depth: 10, widthSegments: 1, heightSegments: 1, depthSegments: 1}} />
        <meshStandardMaterial color={solved ? 'gold' : 'purple'}/>
      </mesh> */}
      <mesh position={position} onClick={e => {e.stopPropagation(); handleClick()}}>
        <boxGeometry parameters={{width: 70, height: 7, depth: 7, widthSegments: 1, heightSegments: 1, depthSegments: 1}}/>
        <meshStandardMaterial 
          transparent 
          opacity={opacity} 
          color={colors[cubeDetails.colorIndex] ?? undefined}/>
      </mesh>
    </>
  )
};

export default Cube
