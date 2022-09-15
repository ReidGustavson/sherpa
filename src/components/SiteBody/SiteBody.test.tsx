import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteBody from './SiteBody';

describe('<SiteBody />', () => {
  test('it should mount', () => {
    render(<SiteBody />);
    
    const siteBody = screen.getByTestId('SiteBody');

    expect(siteBody).toBeInTheDocument();
  });
});