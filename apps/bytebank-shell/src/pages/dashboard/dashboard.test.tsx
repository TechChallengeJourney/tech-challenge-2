import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BytebankDashboard from './dashboard';

describe('<BytebankDashboard />', () => {
  test('it should mount', () => {
    render(<BytebankDashboard />);

    const pagesDashboard = screen.getByTestId('dashboard');

    expect(pagesDashboard).toBeInTheDocument();
  });
});