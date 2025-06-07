import React from 'react';
import { render } from '@testing-library/react';
import { BytebankMenu } from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Menu', () => {
  it('should render successfully', () => {
    const routes = []
    const { baseElement } = render(<BytebankMenu routes={routes} />);
    expect(baseElement).toBeTruthy();
  });
});
