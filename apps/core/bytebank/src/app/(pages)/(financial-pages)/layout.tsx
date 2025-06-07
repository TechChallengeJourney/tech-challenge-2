'use client';
import { BytebankWrapper } from '@bytebank/shared';
import '../../global.scss';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { BytebankBalanceCard } from './_components/balance-card';
import { BytebankExtractCard } from './_components/extract-card';
import styles from './page.module.scss';

const RootLayout = ({ children,
}: {
    children: React.ReactNode;
}) => {
    const [shouldRefreshExtract] = useState(false);

    return (
        <BytebankWrapper>
            <Container>
                <Box my={4} gap={4} className={styles.containerPage}>
                    <Box className={styles.leftColumn} width={'70%'} gap={4}>
                        <BytebankBalanceCard />
                        {children}
                    </Box>
                    <Box className={styles.rightColumn} width={'30%'}>
                        <BytebankExtractCard refresh={shouldRefreshExtract} />
                    </Box>
                </Box>
            </Container>
        </BytebankWrapper>
    );
}

export default RootLayout;