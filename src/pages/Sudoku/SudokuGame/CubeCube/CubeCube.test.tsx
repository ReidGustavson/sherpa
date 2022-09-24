import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CubeCube from './CubeCube';

describe('<CubeCube />', () => {
  test('it should mount', () => {
    
    const cubeCube = screen.getByTestId('CubeCube');

    expect(cubeCube).toBeInTheDocument();
  });
});