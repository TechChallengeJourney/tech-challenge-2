import { render } from '@testing-library/react';

describe('Index', () => {
  it('should run a basic test', () => {
    const { container } = render(<div>Test Passed</div>);
    expect(container).toBeTruthy();
  });
});
