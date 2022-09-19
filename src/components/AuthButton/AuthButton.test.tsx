import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthButton from './AuthButton';

describe('<AuthButton />', () => {
  test('it should mount', () => {
    render(<AuthButton />);
    
    const authButton = screen.getByTestId('AuthButton');

    expect(authButton).toBeInTheDocument();
  });
});