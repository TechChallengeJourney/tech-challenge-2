import React from 'react';
import { render } from '@testing-library/react';
import { BytebankWrapper } from './index';

describe('Wrapper', () => {
  it('renders successfully with BytebankWrapper', () => {
    const { baseElement } = render(
      <BytebankWrapper canNavigate={true} routes={[]} >
        Child Component
      </BytebankWrapper>
    );
    expect(baseElement).toBeTruthy();
  });

  it('does not render the header when canNavigate is false', () => {
    const { queryByText } = render(
      <BytebankWrapper canNavigate={false} routes={[]} >
        Child Component
      </BytebankWrapper>
    );
    expect(queryByText('Mocked BytebankHeader')).not.toBeInTheDocument();
  });
});