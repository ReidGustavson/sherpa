import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteNavBar from './SiteNavBar';

describe('<SiteNavBar />', () => {
  test('it should mount', () => {
    render(<SiteNavBar />);
    
    const siteNavBar = screen.getByTestId('SiteNavBar');

    expect(siteNavBar).toBeInTheDocument();
  });
});