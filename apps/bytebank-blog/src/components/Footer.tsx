import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@repo/utils";

export default function Footer() {
    const { colors } = useTheme();
    return (
        <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'white' }}>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color={colors['lime.100']} mb={1}>
                    © 2025 Bytebank. Todos os direitos reservados.
                </Typography>
                <Typography variant="body2" color={colors['lime.100']}>
                    Construindo seu futuro financeiro, um byte de cada vez.
                </Typography>
            </Container>
        </Box>
    );
}