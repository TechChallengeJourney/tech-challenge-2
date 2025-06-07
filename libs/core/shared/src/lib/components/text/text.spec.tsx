import React from 'react';
import { render, screen } from '@testing-library/react';
import { BytebankText } from './index';

describe('BytebankText', () => {
  it('should render the label correctly', () => {
    const children = "The quick brown fox jumps over the lazy dog";
    const color = "primary";
    const variant = "md";

    render(<BytebankText  color={color} variant={variant}>{children}</BytebankText>);

    const textElement = screen.getByText(children);
    expect(textElement).toBeInTheDocument();
  });
});
