'use client';

import { BytebankIllustration } from '@bytebank/shared';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import styles from './page.module.scss';

export function BytebankCardIllustration(): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={isMobile ? styles.illustrationMobile : styles.illustrationDesktop}>
      <BytebankIllustration name="card-saving" variant="lg" />
    </Box>
  );
};

