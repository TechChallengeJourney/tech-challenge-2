'use client';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import defaultTheme from '../../styles/default.theme';

export interface WrapperRouteProps {
  name: string;
  route: string;
  disabled?: boolean;
}

export function BytebankWrapper({
  canNavigate = true,
  children,
}: {
  routes?: WrapperRouteProps[];
  canNavigate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {children}
      </ThemeProvider>
    </>
  );
}
