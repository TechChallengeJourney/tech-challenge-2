import React from 'react';
import { render } from '@testing-library/react';
import { BytebankInputController } from './ControlledInput';
import { useForm, FormProvider } from 'react-hook-form';

const Wrapper = ({ children }) => {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Input', () => {
  it('render bytebankInput component correctly', () => {
    const { baseElement } = render(
      <Wrapper>
        <BytebankInputController name="nome" label="nome" />
      </Wrapper>
    );
    const inputElement = baseElement.querySelector('.bytebank-input');
    expect(inputElement).toHaveTextContent('nome');
  });
});
