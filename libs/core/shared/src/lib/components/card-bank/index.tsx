import { Box, CardContent, Typography } from '@mui/material';
import { BytebankCard } from '../card';
import { palette } from '../../styles/palette';
import './style.scss';
import { BytebankIllustration } from '../illustration';
import { BankCardVariant } from '../../shared';

export interface BytebankCardBankProps {
  variant: BankCardVariant;
  details: BytebankCardBankDetails
}

export interface BytebankCardBankDetails {
  name: string;
  cardNumber: string;
  expirationDate: string;
}

export function BytebankCardBank({ variant = 'Físico', details }: BytebankCardBankProps) {
  const bgcolor = variant === 'Físico' ? palette['primary.main'] : palette['grey.600'];
  return (
    <Box className="card-bank--container">
      <BytebankCard bgcolor={bgcolor} variant="elevation" className={`card-bank--container__card`}>
        <>
          <Box padding={2} gap={2} color="#FFF">
            <CardContent>
              <Box display='flex' flexDirection={'column'}>
                <BytebankIllustration name="platinum" variant="auto" />
                <Box display='flex' flexDirection={'column'} marginTop={4}>
                  <Typography variant="sm" fontWeight={500} paddingBottom={1}>**** **** **** {details.cardNumber.slice(-4)}</Typography>
                  <Typography variant="sm" fontWeight={200}>{details.name}</Typography>
                  <Typography variant="sm" fontWeight={200}>{details.expirationDate}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </>
      </BytebankCard>
    </Box>
  );
}

