'use client';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../../themes/default.theme';
import { BytebankHeader } from '../header';
import { Box } from '@mui/material';
import { WrapperRouteProps } from '../../classes/models/wrapper-route';
import { UserProvider } from '../../contexts/user.context';
import { FinancialDataProvider } from '../../contexts/financial-data.context';
import { BytebankFooter } from '../footer';

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
        <UserProvider>
          <FinancialDataProvider>
            {canNavigate ? <BytebankHeader /> : ''}
            <Box display={'flex'} minHeight="100vh">
              {children}
            </Box>
            {canNavigate ? <BytebankFooter /> : ''}
          </FinancialDataProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
