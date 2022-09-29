import { FC, useState } from 'react'
import { Color, Vector3 } from 'three'
import { connect } from 'react-redux'
import { ActionTypes, click_cube } from '../../../Redux/actions'
import { CubeDetails } from '../../SudokuGame'
import { SudokuGameState } from '../../../Redux/gameState'


interface CubeProps {
  colors: (Color|null)[]
  position: Vector3
  index: number
  cubeDetails?: CubeDetails
  solved?: boolean
  clickCube?: (index: number) => void
}

const Cube: FC<CubeProps> = ({colors, position, cubeDetails, solved, clickCube}) => {
  console.log('Rerender Cube')
  const defCubeDetails = cubeDetails ?? {given: true, index: 0, colorIndex: 0}
  const newOpacity = defCubeDetails.colorIndex + 1 === colors.length ? 0 : (defCubeDetails.given ? 1 : .8)
  const [opacity, setOpacity] = useState(newOpacity)
  
  if (opacity !== newOpacity) {
    setOpacity(newOpacity)
  }

  function handleClick() {
    if (solved && clickCube) {
      clickCube(defCubeDetails.index)
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
      <mesh
        position={position}
        onClick={(_) => handleClick()}
        // onPointerOver={(_) => handleHover(true)}
        // onPointerOut={(_) => handleHover(false)}
        >
        <boxGeometry parameters={{width: 70, height: 7, depth: 7, widthSegments: 1, heightSegments: 1, depthSegments: 1}}/>
        <meshStandardMaterial 
          transparent 
          opacity={opacity} 
          color={colors[defCubeDetails.colorIndex] ?? undefined}/>
      </mesh>
    </>
  )
};

const mapStateToProps: (state: SudokuGameState, ownProps: CubeProps) => unknown = (state, ownProps) => {
  return {
    solved: state.solved,
    cubeDetails: state.gameDetails[ownProps.index]
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: ActionTypes; payload: unknown }) => unknown) => {
  return {
    clickCube: (index: number) => dispatch(click_cube(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cube)
