import { FC, useState } from 'react'
import { Color, Vector3 } from 'three'
import { connect } from 'react-redux'
import { ActionTypes, click_cube } from '../../Redux/actions'
import { SudokuGameState } from '../../Redux/store'

interface CubeProps {
  index: number
  colors: (Color|null)[]
  position: Vector3
  colorIndex?: number
  solved?: boolean
  given?: boolean
  clickCube?: (index: number) => void
}

const Cube: FC<CubeProps> = (props) => {
  const defProps = {
    ...props,
    colorIndex: props.colorIndex ?? 0,
    solved: props.solved ?? false,
    given: props.given ?? true,
    clickCube: props.clickCube ?? ((_) => {null})
  }

  const newOpacity = defProps.colorIndex + 1 === defProps.colors.length ? 0 : (defProps.given ? 1 : .8)
  const [opacity, setOpacity] = useState(newOpacity)
  if (opacity !== newOpacity) {
    setOpacity(newOpacity)
  }
  
  // function handleHover(over: boolean) {
  //   if (cubeDetails.color && !cubeDetails.given) {
  //      setOpacity(over ? .9 : .8)
  //   }
  // }

  return (
    <>
      {/* <mesh position={defProps.position}>
        <boxGeometry parameters={{width: 10, height: 10, depth: 10, widthSegments: 1, heightSegments: 1, depthSegments: 1}} />
        <meshStandardMaterial color={defProps.solved ? 'gold' : 'purple'}/>
      </mesh> */}
      <mesh
        position={defProps.position}
        onClick={(_) => {if (!defProps.solved) defProps.clickCube(defProps.index ?? 0)}}
        // onPointerOver={(_) => handleHover(true)}
        // onPointerOut={(_) => handleHover(false)}
        >
        <boxGeometry parameters={{width: 70, height: 7, depth: 7, widthSegments: 1, heightSegments: 1, depthSegments: 1}}/>
        <meshStandardMaterial transparent opacity={opacity} color={defProps.colors[defProps.colorIndex] ?? undefined}/>
      </mesh>
    </>
  )
};

const mapStateToProps: (state: SudokuGameState, ownProps: CubeProps) => unknown = (state, ownProps) => {
  const cubeDetails = state.cubeDetails[ownProps.index];
  return {
    solved: state.solved,
    colorIndex: cubeDetails.colorIndex,
    given: cubeDetails.given
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: ActionTypes; payload: number }) => unknown) => {
  return {
    clickCube: (index: number) => dispatch(click_cube(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cube)
