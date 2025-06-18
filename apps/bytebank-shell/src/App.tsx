import React from 'react';
import { BytebankWrapper } from '@repo/ui';

import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes';
import './App.scss';

function App() {
  const navigate = useNavigate();

  return (
    <BytebankWrapper>
      <AppRoutes />
    </BytebankWrapper>
  );
}

export default App;
