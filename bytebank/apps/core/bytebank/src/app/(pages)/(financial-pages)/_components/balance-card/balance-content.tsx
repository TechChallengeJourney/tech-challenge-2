'use client';

import { BytebankText, useFinancialData } from '@bytebank/shared';
import { VisibilityOff, VisibilityRounded } from '@mui/icons-material';
import { Box, Divider, Skeleton } from '@mui/material';
import { BytebankBalanceHeader } from './balance-header';
import { BytebankCardIllustration } from './card-illustration';

import styles from './page.module.scss';

interface Props {
  visible: boolean;
  toggleVisibility: () => void;
}

export function BytebankBalanceContent({ visible, toggleVisibility }: Props) {
  const { isLoading, total_value } = useFinancialData();

  const totalBalanceFormatted = total_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <Box className={styles.balanceContainer}>
      <Box className={styles.leftBlock}>
        <BytebankBalanceHeader />
        <Box className={styles.desktopOnly}>
          <BytebankCardIllustration />
        </Box>
      </Box>

      <Box className={styles.rightBlock}>
        <div className={styles.balanceAccountWrapper}>
          <BytebankText color="white" sx={{ fontWeight: 600 }} variant="sm">
            Saldo
          </BytebankText>
          <div onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
            {visible ? (
              <VisibilityRounded style={{ color: 'white' }} />
            ) : (
              <VisibilityOff style={{ color: 'white' }} />
            )}
          </div>
        </div>
        <Divider style={{ backgroundColor: 'white' }} />
        <div className={styles.balanceAccountData}>
          <BytebankText color="white" sx={{ lineHeight: '32px' }}>
            Conta Corrente
          </BytebankText>
          {isLoading ? (
            <Skeleton width={100} height={32} animation="wave" />
          ) : (
            <BytebankText color="white" sx={{ fontWeight: 600 }} variant="md">
              {visible ? `${totalBalanceFormatted}` : 'R$ ****'}
            </BytebankText>
          )}
        </div>
        <Box className={styles.mobileOnly}>
          <BytebankCardIllustration />
        </Box>
      </Box>
    </Box>
  );
};
