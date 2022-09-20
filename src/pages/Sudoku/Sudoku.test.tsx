import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sudoku from './Sudoku';

describe('<Sudoku />', () => {
  test('it should mount', () => {
    render(<Sudoku />);
    
    const sudoku = screen.getByTestId('Sudoku');

    expect(sudoku).toBeInTheDocument();
  });
});