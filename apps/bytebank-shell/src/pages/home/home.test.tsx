
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BytebankHome from './home';

describe('<BytebankHome />', () => {
  test('it should mount', () => {
    render(<BytebankHome />);

    const pagesHome = screen.getByTestId('Home');

    expect(pagesHome).toBeInTheDocument();
  });
});