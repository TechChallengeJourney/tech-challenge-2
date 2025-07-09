import React from 'react';
import BytebankHomePage from './home';

// Componente específico para SSG
const BytebankHomePageSSG = () => {
  return <BytebankHomePage isSSG={true} />;
};

export default BytebankHomePageSSG;
