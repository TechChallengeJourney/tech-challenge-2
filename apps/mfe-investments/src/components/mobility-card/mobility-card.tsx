import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import React from 'react'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatCurrencyBRL } from '../../utils/index'

interface BytebankMobilityProps {
  value?: string;
}

export default function MfeBytebankMobility({ value } : BytebankMobilityProps) {
  return (
    <BytebankCard>
      <Box padding='1.25rem'>
        <Box display='flex' alignItems="center" gap="1rem">
          <TrendingDownIcon fontSize='large' />
          <BytebankText fontSize='1rem' color='primary'>Sua maior despesa neste mês foi em:</BytebankText>
        </Box>
          <BytebankText fontSize='1.25rem' fontWeight='bold'>Mobilidade</BytebankText>
          <BytebankText fontSize='1rem'>Valor: <span style={{fontWeight: "700"}}>{formatCurrencyBRL(value ? value : '00')}</span></BytebankText>
      </Box>
    </BytebankCard>
  )
}
