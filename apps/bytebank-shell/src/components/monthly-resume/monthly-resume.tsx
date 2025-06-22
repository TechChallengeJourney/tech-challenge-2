import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import React from 'react'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatCurrencyBRL } from '../../utils/index'


interface BytebankMonthlyResumeProps {
  data?: any;
}

export default function BytebankMonthlyResume({ data } : BytebankMonthlyResumeProps) {
  return (
    <BytebankCard>
      <Box padding='1rem'>
          <BytebankText fontSize='1.5rem' fontWeight='bold'>Resumo Financeiro Mensal</BytebankText>
      </Box>
    </BytebankCard>
  )
}
