import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllRoutes from './AllRoutes';

describe('<AllRoutes />', () => {
  test('it should mount', () => {
    render(<AllRoutes />);
    
    const routes = screen.getByTestId('Routes');

    expect(routes).toBeInTheDocument();
  });
});