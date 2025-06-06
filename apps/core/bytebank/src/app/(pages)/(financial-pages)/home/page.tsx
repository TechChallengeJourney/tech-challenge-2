'use client';

import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { BytebankCardTransaction } from '../_components/card-transaction';

const BytebankHome: React.FC = () => {
  const [, setShouldRefreshExtract] = useState(false);


  // useCallback p/ evitar re-renderizações desnecessárias
  const handleTransactionSuccess = useCallback(() => {
    setShouldRefreshExtract(prev => !prev);
  }, []);

  return (
      <Box>
        <BytebankCardTransaction onSuccess={handleTransactionSuccess} />
      </Box>
  );
};

export default BytebankHome;
