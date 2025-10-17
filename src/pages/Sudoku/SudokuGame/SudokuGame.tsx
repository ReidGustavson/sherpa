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
  const containerRef = useRef<HTMLDivElement|null>(null)
  const gameSize = useAppSelector((state) => state.sudoku.currentGame.gameSize)
  const cubesDetailsLoaded = useAppSelector((state) => state.sudoku.currentGame.gameDetails.length === Math.pow(state.sudoku.currentGame.gameSize,3))
  const dispatch = useAppDispatch()
  const [colors, setColors] = useState<Color[]>([])
  const [loading, setLoading] = useState(false)
  const [cubeIndices, setCubeIndices] = useState<number[][] | null>()

 const scrollRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let isDragging = false
    let lastX = 0
    let lastY = 0
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollRef.current.x -= e.deltaX * 0.005;
      scrollRef.current.y -= e.deltaY * 0.005;
    };
    
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      isDragging = true
      const point = 'touches' in e ? e.touches[0] : e
      lastX = point.clientX
      lastY = point.clientY
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      if (!isDragging) return
      const point = 'touches' in e ? e.touches[0] : e
      const dx = point.clientX - lastX
      const dy = point.clientY - lastY
      lastX = point.clientX
      lastY = point.clientY
      scrollRef.current.x += dx * 0.005
      scrollRef.current.y += dy * 0.005
    }

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      isDragging = false
    }

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener('pointerdown', handlePointerDown)
    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerup', handlePointerUp)
    return () => {
      el.removeEventListener("wheel", handleWheel)
      el.removeEventListener('pointerdown', handlePointerDown)
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerup', handlePointerUp)
    }
  }, []);

  useEffect(() => {
    if (gameSize && colors?.length !== gameSize) {
      loadGame()
    }
  }, [gameSize])

  function loadGame() {
    setLoading(true)
    API.get(ApiName, path + '/' + gameSize, {}).then(response => {
      const newGameDetails = response.values.map((x: number, i: number) => {
        return {colorIndex: x, index: i, given: x < (gameSize)}
      })
      dispatch(set_game(newGameDetails))
      const choices = CUBE_COLOURS.slice(0, gameSize)
      setColors([...choices.map(x => new Color(x))])
      setCubeIndices(getCubeIndexes(gameSize))
      setLoading(false)
    })
  }

  return (
    <div className={styles.SudokuGame} ref={containerRef}>
      {!loading && cubesDetailsLoaded && cubeIndices?.map((indices: number[], i: number, _: number[][]) =>
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
