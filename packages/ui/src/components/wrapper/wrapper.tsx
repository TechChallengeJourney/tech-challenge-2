'use client';
import { BytebankHeader } from '../header/header';
import { Box, Container, CssBaseline } from '@mui/material';
import { BytebankThemeProvider } from '../../contexts/theme.context';
import { BytebankFooter } from '../footer/footer';

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
      <BytebankThemeProvider>
        <CssBaseline />
        {canNavigate ? <BytebankHeader /> : ''}
        <Container maxWidth="xl" sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Box py={2} display={'flex'} flex={1}>
            {children}
          </Box>
        </Container>
        {canNavigate ? <BytebankFooter /> : ''}
      </BytebankThemeProvider>
    </>
  );
}
