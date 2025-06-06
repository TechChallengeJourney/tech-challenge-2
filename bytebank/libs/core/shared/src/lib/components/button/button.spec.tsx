import React from 'react';
import { render } from '@testing-library/react';
import { BytebankButton } from './index';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BytebankButton label="Concluir transação" color="primary" variant="contained" />
    );
    expect(baseElement).toBeTruthy();
  });
});
