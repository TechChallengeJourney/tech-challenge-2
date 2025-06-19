
import { BytebankThemeProvider } from '@repo/ui';
import { Box, CssBaseline } from '@mui/material';
import { BytebankHeader } from '../header/header';
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
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Box pt={2} display={'flex'} flex={1}>
            {children}
          </Box>
        </Box>
        {canNavigate ? <BytebankFooter /> : ''}
      </BytebankThemeProvider>
    </>
  );
}
