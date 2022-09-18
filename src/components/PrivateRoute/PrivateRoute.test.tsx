import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrivateRoute from './PrivateRoute';

describe('<PrivateRoute />', () => {
  test('it should mount', () => {
    render(<PrivateRoute rest={{
      rest: undefined,
      key: undefined
    }}></PrivateRoute>);
    
    const privateRoute = screen.getByTestId('PrivateRoute');

    expect(privateRoute).toBeInTheDocument();
  });
});