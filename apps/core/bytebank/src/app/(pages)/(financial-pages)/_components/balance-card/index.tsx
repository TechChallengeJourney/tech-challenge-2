'use client';

import { BytebankCard } from '@bytebank/shared';
import { Box } from '@mui/material';

import { useState } from 'react';

import { BytebankBalanceContent } from './balance-content';

import styles from './page.module.scss';

export function BytebankBalanceCard(): React.ReactElement {
  const [visible, setVisible] = useState(true);
  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <Box className={styles.cardWrapper}>
      <BytebankCard bgIllustration="primary" className={styles.card}>
        <BytebankBalanceContent
          visible={visible}
          toggleVisibility={toggleVisibility}
        />
      </BytebankCard>
    </Box>
  );
}
