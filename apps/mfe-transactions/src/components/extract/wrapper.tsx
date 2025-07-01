import React, { Children } from 'react';
import { UserProvider } from '@repo/data-access';
import BytebankExtract from './index';

interface BytebankExtractWrapperProps {
  children: React.ReactNode;
}

const BytebankExtractWrapper:  React.FC<BytebankExtractWrapperProps>  = ({children}  ) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default BytebankExtractWrapper;
