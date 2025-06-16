import React, { JSX, useState } from 'react';
import { Button, ToggleButton } from '@mui/material';
import { useTheme } from '../../contexts/theme.context';
import { DarkMode } from '@mui/icons-material';

export const BytebankToggleButton = (): JSX.Element => {
  const [selected, setSelected] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const iconColor = theme.palette.text.primary;

  return (
    <>
      <ToggleButton
        value="check"
        selected={selected}
        aria-label={'Alterar para modelo escuro'} 
        onChange={() => {
          toggleTheme();
          setSelected((prev) => !prev);
        }}
      >
        <DarkMode style={{ color: iconColor }} />
      </ToggleButton>

    </>
  );
};