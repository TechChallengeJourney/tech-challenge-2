import { useTheme } from '@repo/ui';
import './footer.module.scss';
import { Box, Container, Link, Typography } from '@mui/material';

export function BytebankFooter() {
    const { colors } = useTheme();
    const footerColor = colors['navigation'];
    const isLogged = true;
    const loggedTemplate = () => (<><Box display={'flex'} justifyContent={'center'} width={'100%'} textAlign={'center'}><Typography>© 2025 Bytebank. Todos os direitos reservados.<br />Construindo seu futuro financeiro, um byte de cada vez.</Typography></Box></>);
    const unloggedTemplate = () => (<>
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
            sx={{ flexGrow: 1 }}
            height="100%">
            <Typography sx={{ fontWeight: 700 }}>
                Serviços
            </Typography>
            <Typography>
                Conta corrente
            </Typography>
            <Typography>
                Conta PJ
            </Typography>
            <Typography>
                Cartão de crédito
            </Typography>
        </Box>
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
            sx={{ flexGrow: 1 }}
            height="100%">
            <Typography sx={{ fontWeight: 700 }}>
                Contato
            </Typography>
            <Typography>
                0800 004 250 08
            </Typography>
            <Typography>
                meajuda@bytebank.com.br
            </Typography>
            <Typography>
                ouvidoria@bytebank.com.br
            </Typography>
        </Box>
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
            sx={{ flexGrow: 1 }}
            height="100%"
            alignItems="center">
            <Typography sx={{ fontWeight: 700 }}>
                Desenvolvido por Grupo 16
            </Typography>
            <Box display="flex" alignItems="center">
                <Link href="/" className="logo-footer">
                    <img
                        src="logo.svg"
                        className="logo"
                        alt="Bytebank logo"
                    />
                </Link>
            </Box>
        </Box>
    </>);
    return (
        <footer className="bytebank-footer">
            <Box width={'100%'} id="bytebank-bg-footer" bgcolor={footerColor} sx={{ borderTop: '1px solid rgb(134 134 132 / 15%)' }}>
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
                        {!isLogged ? (unloggedTemplate()) : (loggedTemplate())}
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}
