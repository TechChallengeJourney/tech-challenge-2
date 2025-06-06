import React from 'react';
import { render } from '@testing-library/react';
import { BytebankCard } from './index';

describe('BytebankCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BytebankCard />);
    expect(baseElement).toBeTruthy();
  });
});
