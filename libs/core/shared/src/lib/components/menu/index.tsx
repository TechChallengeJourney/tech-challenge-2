'use client';
import './style.scss';
import { styled, useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Drawer, Typography, Link, DrawerProps } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { palette, WrapperRouteProps } from '../../shared';

interface MenuProps {
    routes: WrapperRouteProps[];
    isLogged?: boolean;
    mobile?: boolean;
}

export function BytebankMenu({ routes, isLogged, mobile }: MenuProps) {
    const router = useRouter();
    const theme = useTheme();
    const pathName = usePathname();
    const DrawerColor = styled(Drawer)<DrawerProps>(() => ({
      '.MuiDrawer-paper': {
        backgroundColor: !isLogged ? palette['black.main'] : palette['primary.main'],
      },
    }));

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
    const redirectTo = (name: string) => router.push(name);

    const mappedRoutes = (
        routes.map(route => (
            <Typography key={route.route} variant="sm" textTransform="capitalize" className={`menu-item ${route.disabled && 'disabled'} ${pathName === route.route ? 'active' : ''}`}>
                <Link color={isLogged ? 'white' : 'success'} onClick={() => redirectTo(route.route)}>
                {route.name}
                </Link>
            </Typography>
        ))
    )

    return (
        <Box className={mobile ? 'mobile' : ''} display="flex" gap={2} alignItems="center" style={{ fontFamily: theme.typography.fontFamily }}>
            <Box className="menu-mobile" alignItems="center">
                <IconButton
                    aria-label="open menu"
                    onClick={toggleDrawer(true)}
                    edge="start"
                    sx={{
                        height: 'fit-content'
                    }}
                >
                    <MenuIcon htmlColor={!isLogged ? palette['success.main'] : palette['white.main']} fontSize="large" />
                </IconButton>
                <DrawerColor open={open} onClose={toggleDrawer(false)}>
                    <Box display="flex" flexDirection="column" gap={3} p={4} onClick={toggleDrawer(false)}>
                        {mappedRoutes}
                    </Box>
                </DrawerColor>
            </Box>
            <Box className="menu-desktop" gap={4} ml={4} justifyContent={'flex-start'} textAlign={'center'} minWidth={'30vw'}>
                {mappedRoutes}
            </Box>
        </Box>
    );
}
