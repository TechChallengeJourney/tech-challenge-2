'use client';
import './style.scss';

import { useRouter } from 'next/navigation';
import {
  AppBar,
  Box,
  Container,
  Link,
  MenuItem,
  Typography,
  Menu,
  IconButton,
  Avatar,
  LinearProgress,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { BytebankMenu } from '../menu';
import { BytebankButton } from '../button';
import { ReactElement, useState } from 'react';
import { BytebankText } from '../text';
import {
  loggedRoutes,
  unloggedRoutes,
} from '../../classes/constants/routes.config';
import { useUser } from '../../contexts/user.context';
import { BytebankLoginModal } from '../../modals/login-modal';
import { BytebankRegisterModal } from '../../modals/register-modal';
import { BytebankSnackbar } from '../snackbar';
import { SnackbarData } from '../../classes/models/snackbar';
import { AccessModalType } from '../../classes/enums/access-modal-type.enum';

export function BytebankHeader(): ReactElement {
  const router = useRouter();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { user, setUser, loading } = useUser();

  const isLogged = !!user;
  const settings = [
    {
      name: 'Minha conta',
      action: () => {
        handleCloseUserMenu();
        redirectTo('/minha-conta');
      },
    },
    { name: 'Sair', action: () => handleLogout() },
  ];

  const redirectTo = (name: string) => router.push(name);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const closeLoginModal = () => setOpenLoginModal(false);
  const closeRegisterModal = () => setOpenRegisterModal(false);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null)
  };

  const handleLoginModal = ({ status, message }: SnackbarData) => {
    if (status === 'success') {
      router.push('/home');
      setTimeout(() => {
        closeLoginModal();
      }, 20000);
    } else {
      closeRegisterModal();
      setSnackbarData({ status, message });
      setSnackbarOpen(true);
    }
  };

  const handleRegisterModal = ({ status, message }: SnackbarData) => {
    if (status === 'success') {
      closeRegisterModal();
    }

    closeLoginModal();
    setSnackbarData({ status, message });
    setSnackbarOpen(true);
  };

  const handleModalStates = (type: AccessModalType) => {
    if(type === AccessModalType.REGISTER) {
      closeRegisterModal(); 
      setOpenLoginModal(true);
    } else {
      closeLoginModal();
      setOpenRegisterModal(true);
    }
  }

  const handleLogout = (): void => {
    handleCloseUserMenu();
    setUser(null);
    redirectTo('/');
  };

  const renderMenuSettings = () => {
    return (
      <>
        {isLogged ? (
          <Box sx={{ flexGrow: 0 }} className={'menu-settings'}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
              {!isMobile ? (<BytebankText variant={'sm'} color={'#FFF'}>{user?.name || ''}</BytebankText>) : null}
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.action}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : null}
      </>
    );
  };

  return (
    <>
      {loading ? (
        <LinearProgress color={'primary'} />
      ) : (
        <AppBar
          className={`header ${isLogged ? 'header--logged' : ''}`}
          position="static"
        >
          <Container maxWidth={(isLogged ? 'lg' : 'md')} className="container">
            <Box
              display={'flex'}
              flexDirection={'row'}
              gap={4}
              flexGrow="1"
              height="100%"
              alignItems="center"
              justifyContent={'space-between'}
            >
              <Box display="flex" gap={2} justifyContent={'space-around'} flexDirection={(!isMobile ? 'row' : 'row-reverse')}>
                <Box display="flex" alignItems="center">
                  <Link onClick={() => redirectTo(isLogged ? '/home' : '/')} sx={{ cursor: 'pointer' }}>
                    <img
                      src="/images/logo.png"
                      className="logo"
                      alt="Bytebank logo"
                    />
                  </Link>
                </Box>
                <BytebankMenu
                  isLogged={isLogged}
                  routes={isLogged ? loggedRoutes : unloggedRoutes}
                />
              </Box>

              {!isLogged ? (
                !isMobile ? (
                  <Box display={'flex'} flex={'none'} gap={2}>
                    <BytebankButton
                      sendSubmit={() => setOpenRegisterModal(true)}
                      label="Crie uma conta"
                      color="success"
                      variant="contained"
                    />
                    <BytebankButton
                      sendSubmit={() => setOpenLoginModal(true)}
                      label="Entre"
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                ) :
                  (<Box display={'flex'}>
                    <IconButton onClick={() => setOpenRegisterModal(true)}>
                      <AppRegistrationRoundedIcon color={'success'}></AppRegistrationRoundedIcon>
                    </IconButton>
                    <IconButton onClick={() => setOpenLoginModal(true)}>
                      <LoginIcon color={'success'}></LoginIcon>
                    </IconButton>
                  </Box>
                  )
              ) : ''}
              {renderMenuSettings()}
            </Box>
          </Container>
        </AppBar>
      )}

      <BytebankRegisterModal open={openRegisterModal} onClose={closeRegisterModal} onSubmit={handleRegisterModal} openModal={handleModalStates} />
      <BytebankLoginModal open={openLoginModal} onClose={closeLoginModal} onSubmit={handleLoginModal} openModal={handleModalStates} />
      <BytebankSnackbar open={isSnackbarOpen} data={snackbarData} onClose={closeSnackbar} />
    </>
  );
}
