import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BodyRoutes from './BodyRoutes';

describe('<BodyRoutes />', () => {
  test('it should mount', () => {
    render(<BodyRoutes />);
    
    const routes = screen.getByTestId('Routes');

    expect(routes).toBeInTheDocument();
  });
});