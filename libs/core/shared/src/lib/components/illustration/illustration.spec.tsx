import React from 'react';
import { render } from '@testing-library/react';

import { BytebankIllustration } from './index';

describe('BytebankIllustration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BytebankIllustration name="error" size="auto" />);
    expect(baseElement).toBeTruthy();
  });
});
