import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RSNRoutes from './RSNRoutes';

describe('<RSNRoutes />', () => {
  test('it should mount', () => {
    render(<RSNRoutes />);
    
    const rsnRoutes = screen.getByTestId('RSNRoutes');

    expect(rsnRoutes).toBeInTheDocument();
  });
});