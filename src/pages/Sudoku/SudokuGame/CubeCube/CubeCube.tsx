import { Canvas }  from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"
import { FC } from 'react'
import { PerspectiveCamera, Color, Vector3 } from 'three'
import * as THREE from 'three'
import Cube from './Cube/Cube'
import { Provider } from 'react-redux'
import { store } from '../../../../redux/reduxStore'
import Border from './Border/Border'

interface CubeCubeProps {
  colors: (Color | null)[]
  indexes: number[]
  position: Vector3
  cubeCubeIndex: number
}

const CubeCube: FC<CubeCubeProps> = ({ colors, indexes }) => {
  const cubeSize = Math.cbrt(indexes.length)
  const offset = (cubeSize / 2) -.5
  
  function getPosition(index: number){
    const x = (index % cubeSize) - offset
    const y = (Math.floor(index / cubeSize) % cubeSize) - offset
    const z = (Math.floor(index / (cubeSize*cubeSize)) % cubeSize) - offset
    return new Vector3(x,y,z)
  }

  const cubeCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 15 )
  cubeCamera.position.set(0,0,cubeSize * 2 + 1)
  cubeCamera.lookAt(new Vector3(0,0,0))
  return (
    <Canvas camera={cubeCamera}>
      <OrbitControls/>
      <ambientLight color={new Color('white')} intensity={1}/>
      <Provider store={store}>
      {
        indexes.map((cubeIndex, index) => {
        const position = getPosition(index)
        return (
          <Border
            key={'border_'+cubeIndex}
            position={position}
            />
        )}
      )}
      {
        indexes.map((cubeIndex, index) => {
        const position = getPosition(index)
        return (
          <Cube
            key={'cube_'+cubeIndex}
            index={cubeIndex}
            colors={colors}
            position={position}
            />
        )}
      )
      }
      </Provider>
      {/* <CameraHelper/> */}
    </Canvas>
  )
};

function CameraHelper() {
  const camera = new PerspectiveCamera(9, 9, 9, 3);
    return <group position={[0, 0, 2]}>
      <cameraHelper args={[camera]} />
    </group>;
}

export default CubeCube