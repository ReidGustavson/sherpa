import { Canvas, useFrame }  from '@react-three/fiber'
import { FC, RefObject, useRef } from 'react'
import { PerspectiveCamera, Color, Vector3, Group } from 'three'
import Cube from './Cube/Cube'
import { Provider } from 'react-redux'
import { store } from '../../../../redux/reduxStore'
import Border from './Border/Border'

interface CubeCubeProps {
  colors: (Color)[]
  indexes: number[]
  position: Vector3
  cubeCubeIndex: number
  scrollRef: RefObject<{ x: number; y: number; }>
}

const CubeCube: FC<CubeCubeProps> = ({ scrollRef, colors, indexes }) => {
  const parentRef = useRef<Group>(null)
  const cubeSize = Math.cbrt(indexes.length)
  const offset = (cubeSize / 2) -.5

  useFrame(() => {
    if (!parentRef.current) return;
    if (scrollRef.current?.y) parentRef.current.rotation.x += (scrollRef.current.y - parentRef.current.rotation.x) * 0.5;
    if (scrollRef.current?.x) parentRef.current.rotation.y += (scrollRef.current.x - parentRef.current.rotation.y) * 0.5;
  });
  
  function getPosition(index: number){
    const x = (index % cubeSize) - offset
    const y = (Math.floor(index / cubeSize) % cubeSize) - offset
    const z = (Math.floor(index / (cubeSize*cubeSize)) % cubeSize) - offset
    return new Vector3(x,y,z)
  }

  return (
    <>
      <ambientLight color={new Color('white')} intensity={1}/>
      <Provider store={store}>
        <group ref={parentRef}>
          {
            indexes.map((cubeIndex, index) => {
              const position = getPosition(index)
              return <group key={"complete_"+cubeIndex}>
                <Border
                  key={'border_'+cubeIndex}
                  position={position}
                />
                <Cube
                  key={'cube_'+cubeIndex}
                  index={cubeIndex}
                  colors={colors}
                  position={position}
                />
              </group>
            })
          }
        </group>
      </Provider>
    </>
  )
};

const WrappedCubeCube: FC<CubeCubeProps> = (props) => {
  const cubeCamera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 15 )
  const cubeSize = Math.cbrt(props.indexes.length)
  cubeCamera.position.set(0,0, cubeSize * 2 + 1)
  cubeCamera.lookAt(new Vector3(0,0,0))
  return (
    <Canvas camera={cubeCamera}>
      <CubeCube {...props} />
    </Canvas>
  )
}


export default WrappedCubeCube