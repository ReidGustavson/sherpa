import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrivateOutlet from './PrivateOutlet';

describe('<PrivateOutlet />', () => {
  test('it should mount', () => {
    render(<PrivateOutlet />);
    
    const privateOutlet = screen.getByTestId('PrivateOutlet');

    expect(privateOutlet).toBeInTheDocument();
  });
});