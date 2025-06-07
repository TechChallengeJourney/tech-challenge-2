import { render } from '@testing-library/react';

import {BytebankCardBank} from './index';
import React from 'react';

describe('BytebankCardBank', () => {
  it('should render successfully', () => {
    const details = {
      name: 'João da Silva',
      cardNumber: '1223242424343',
      expirationDate: '12/2030'
    }
    const { baseElement } = render(<BytebankCardBank variant={'physical'} details={details}/>);
    expect(baseElement).toBeTruthy();
  });
});
