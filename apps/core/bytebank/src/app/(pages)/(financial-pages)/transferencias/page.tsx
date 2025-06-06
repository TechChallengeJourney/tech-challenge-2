'use client';

import ConstructionIcon from '@mui/icons-material/Construction';
import { Box } from '@mui/material';
import { BytebankText } from '@bytebank/shared';

export default function Transferencias() {

    return (
        <Box display="flex" justifyContent="center">
            <ConstructionIcon></ConstructionIcon>
            <BytebankText marginLeft={2}>Página em construção...</BytebankText>
        </Box>
    );
}
