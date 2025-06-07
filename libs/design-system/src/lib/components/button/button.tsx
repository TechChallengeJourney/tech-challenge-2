import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '@bytebank/shared';
export const MyButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return (
    // <ThemeProvider theme={defaultTheme}>
        <button style={{ background: 'red' }} onClick={onClick}>{label}</button>
    // </ThemeProvider>
  );
};

