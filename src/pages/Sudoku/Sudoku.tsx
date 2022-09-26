import { FC, useEffect, useState } from 'react';
import { Canvas }  from '@react-three/fiber';
import { OrbitControls, Stars } from "@react-three/drei";
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import * as THREE from 'three';
import { Color } from 'three';
import { newRandomGame } from './SudokuGame/CubeMath';

const Sudoku: FC = () => {
  const gameSize = 3
  const colors = [new Color('red'), new Color('blue'), new Color('green'),new Color('purple'),new Color('yellow')]
  const [game] = useState([3,3,3,1,2,0,2,0,1,3,3,3,3,3,3,3,1,2,2,0,1,0,1,2,1,2,0])
  useEffect(() => {
    document.title = `Sudoku`;
  });

  
  const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.x = 10
  camera.position.y = 10
  camera.position.z = 10
  // camera.lookAt( scene.position );
  // camera.updateMatrixWorld();
  
  // const raycaster = new THREE.Raycaster();
  // const pointer = new THREE.Vector2();
  // raycaster.setFromCamera( pointer, camera );

  // const intersects = raycaster.intersectObjects( scene.children, false );
  // let INTERSECTED: THREE.Object3D<THREE.Event>
  
  // function setIntersected() {
  //   if ( intersects.length > 0 ) {

  //   if ( INTERSECTED != intersects[ 0 ].object ) {

  //     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

  //     INTERSECTED = intersects[ 0 ].object;
  //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
  //     INTERSECTED.material.emissive.setHex( 0xff0000 );

  //   }

  // } else {

  //   if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

  //   INTERSECTED = null;

  // }

  // function onPointerMove( event: { clientX: number; clientY: number; } ) {
  //   pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
  //   pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1
  // }

  return (
    <div className={styles.Sudoku}>
      <Canvas camera={camera}>
        <OrbitControls/>
        <Stars />
        <ambientLight color={new Color('white')} intensity={1}/>
        <SudokuGame 
          gameSize={gameSize} 
          colorIndexes={game}
          colors={[...colors.slice(0, gameSize), null]}/>
      </Canvas>
    </div>
  );
};

export default Sudoku;
