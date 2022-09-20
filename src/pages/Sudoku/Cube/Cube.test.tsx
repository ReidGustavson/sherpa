import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cube from './Cube';

describe('<Cube />', () => {
  test('it should mount', () => {
    render(<Cube />);
    
    const cube = screen.getByTestId('Cube');

    expect(cube).toBeInTheDocument();
  });
});
