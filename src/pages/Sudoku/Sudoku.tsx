import { FC, useEffect } from 'react';
import { Canvas }  from '@react-three/fiber';
import { OrbitControls, Stars } from "@react-three/drei";
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import * as THREE from 'three';
import { Color } from 'three';
import { connect } from 'react-redux'
import { ActionTypes, set_game_size } from './Redux/actions';
import { SudokuGameState } from './Redux/gameState';

interface SudokuProps {
  gameSize?: number
  setGameSize?: (gameSize: number) => void
}

const Sudoku: FC<SudokuProps> = ({gameSize, setGameSize}) => {
  useEffect(() => {
    document.title = `Sudoku`;
  });
  console.log('Rerender Sudoku')
  if(gameSize===0 && setGameSize) {
    setGameSize(3)
  }

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
        <SudokuGame/>
      </Canvas>
    </div>
  );
};

const mapStateToProps: (state: SudokuGameState, ownProps: SudokuProps) => unknown = (state, _) => {
  console.log('IN sudoku: ', state.gameSize)
  return {
    gameSize: state.gameSize
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: ActionTypes; payload: unknown}) => unknown) => {
  return { setGameSize: (gameSize: number) => {console.log('Setting gamesize', gameSize);dispatch(set_game_size(gameSize))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sudoku)
