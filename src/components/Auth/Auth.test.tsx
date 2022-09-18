import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('<Auth />', () => {
  test('it should mount', () => {
    render(<div/>);
    
    const auth = screen.getByTestId('Auth');

    expect(auth).toBeInTheDocument();
  });
});