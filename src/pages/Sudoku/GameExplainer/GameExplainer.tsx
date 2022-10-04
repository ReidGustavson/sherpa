const GameExplainer = () =>(
  <div>
    <h2>Sudoku3D</h2>
    <a href="/" style={{float:"right"}}><button>X</button></a>
    <p>Every row, column, and depth need to have exaclty one cube of each color. Click on the clear missing spaces to fill in with your guesses. In order to fill in cubes in the center, the inner cubes have been duplicated below. You&aposll notice that your guess cubes are slightly more transparent than the given ones. If you want to reset to the start, use the reset button.</p>
  </div>
);

export default GameExplainer;