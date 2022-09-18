import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logo from './Logo';

describe('<Logo />', () => {
  test('it should mount', () => {
    render(<Logo imgSource={''} />);
    
    const logo = screen.getByTestId('Logo');

    expect(logo).toBeInTheDocument();
  });
});