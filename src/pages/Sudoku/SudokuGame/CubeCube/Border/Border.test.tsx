import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Border from './Border';

describe('<Border />', () => {
  test('it should mount', () => {
    render(<Border solved={false}/>);
    
    const border = screen.getByTestId('Border');

    expect(border).toBeInTheDocument();
  });
});