'use client';
import Link from 'next/link';

import { BytebankText } from '../text';
import './style.scss';

import { AppBar, Box, Container } from '@mui/material';

export function BytebankFooter() {
    return (
        <AppBar className="bytebank-footer" position="static">
            <Container className="container">
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    gap={4}
                    sx={{ flexGrow: 1 }}
                    padding={4}
                    height="100%"
                    alignItems="flex-start"
                >
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={2}
                        sx={{ flexGrow: 1 }}
                        height="100%">
                        <BytebankText sx={{ fontWeight: 700 }}>
                            Serviços
                        </BytebankText>
                        <BytebankText>
                            Conta corrente
                        </BytebankText>
                        <BytebankText>
                            Conta PJ
                        </BytebankText>
                        <BytebankText>
                            Cartão de crédito
                        </BytebankText>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={2}
                        sx={{ flexGrow: 1 }}
                        height="100%">
                        <BytebankText sx={{ fontWeight: 700 }}>
                            Contato
                        </BytebankText>
                        <BytebankText>
                            0800 004 250 08
                        </BytebankText>
                        <BytebankText>
                            meajuda@bytebank.com.br
                        </BytebankText>
                        <BytebankText>
                            ouvidoria@bytebank.com.br
                        </BytebankText>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={2}
                        sx={{ flexGrow: 1 }}
                        height="100%"
                        alignItems="center">
                        <BytebankText sx={{ fontWeight: 700 }}>
                            Desenvolvido por Grupo 16
                        </BytebankText>
                        <Box display="flex" alignItems="center">
                            <Link href="/" className="logo-footer">
                                <img
                                    src="/images/logo.png"
                                    className="logo"
                                    alt="Bytebank logo"
                                />
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );
}
