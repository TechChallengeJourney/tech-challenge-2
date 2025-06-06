import styles from './page.module.scss';
import { Box } from '@mui/material';
import { BytebankExtract } from '../extract';

type Props = {
  refresh?: boolean;
};

export function BytebankExtractCard({ refresh }: Props) {
  return (
    <Box className={styles.extract}>
      <BytebankExtract
        key={refresh ? 'refresh-true' : 'refresh-false'} // <- força recriação do componente
      />
    </Box>
  );
}
