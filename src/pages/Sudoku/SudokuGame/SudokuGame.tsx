import { FC, useEffect, useRef, useState } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
import { getCubeIndexes } from './CubeMath'
import { API } from 'aws-amplify'
import { set_game } from '../Redux/actions'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import styles from './SudokuGame.module.scss';

const ApiName = 'sudokuDaily'
const path = '/sudoku/daily'

const CUBE_COLOURS = ['red', 'blue', 'rgb(0,100,100)', 'rgb(170, 255, 0)', 'fuchsia']

const SudokuGame: FC = () => {
  const gameSize = useAppSelector((state) => state.sudoku.currentGame.gameSize)
  const cubesDetailsLoaded = useAppSelector((state) => state.sudoku.currentGame.gameDetails.length > 0)
  const dispatch = useAppDispatch()
  const [colors, setColors] = useState<Color[]>([])
  const [loading, setLoading] = useState(false)
  const [cubeIndices, setCubeIndices] = useState<number[][] | null>()

 const scrollRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollRef.current.x -= e.deltaX * 0.005;
      scrollRef.current.y -= e.deltaY * 0.005;
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (gameSize && colors?.length !== gameSize) {
      const choices = CUBE_COLOURS.slice(0, gameSize)
      setColors([...choices.map(x => new Color(x))])
    }
    setCubeIndices(getCubeIndexes(gameSize))
  }, [gameSize])

  if (!loading && !cubesDetailsLoaded) {
    loadGame()
  }

  function loadGame() {
    setLoading(true)
    API.get(ApiName, path + '/' + gameSize, {}).then(response => {
      const newGameDetails = response.values.map((x: number, i: number) => {
        return {colorIndex: x, index: i, given: x < (gameSize)}
      })
      dispatch(set_game(newGameDetails))
      setLoading(false)
    })
  }

  return (
    <div className={styles.SudokuGame}>
      {cubeIndices?.map((indices: number[], i: number, _: number[][]) =>
        <div key={gameSize + '_' + i}>
          <CubeCube
            colors={colors ?? []}
            indexes={indices}
            position={new Vector3(0, i*6,0)}
            cubeCubeIndex={i}
            scrollRef={scrollRef}
          />
        </div>
      )}
    </div>
  );
};

export default SudokuGame
