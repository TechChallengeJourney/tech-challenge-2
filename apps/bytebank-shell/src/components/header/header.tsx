import "./header.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
    loggedPages,
    unloggedPages,
    BytebankButton,
    BytebankToggleButton,
    SnackbarData,
    AccessModalType,
    BytebankSnackbar,
} from "@repo/ui";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import LoginIcon from "@mui/icons-material/Login";
import { useUser } from "@repo/data-access";
import { BytebankRegisterModal, BytebankLoginModal } from "../../modals";
import { useTheme } from "@repo/utils";

export function BytebankHeader() {
    const { colors } = useTheme();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const { user, setUser } = useUser();
    const isLogged = !!user;
    const pages = isLogged ? loggedPages : unloggedPages;

    const settings = [
        {
            name: "Minha conta",
            action: () => navigate('/minha-conta'),
        },
        { name: "Sair", action: () => handleLogout() },
    ];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const navigate = useNavigate();


    const closeLoginModal = () => setOpenLoginModal(false);
    const closeRegisterModal = () => setOpenRegisterModal(false);

    const closeSnackbar = () => { setSnackbarOpen(false); setSnackbarData(null); };

    const handleLoginModal = ({ status, message }: SnackbarData) => {
        if (status === 'success') {
            setTimeout(() => {
                closeLoginModal();
                navigate('/dashboard');
            }, 500);
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
        if (type === AccessModalType.REGISTER) {
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
        navigate('/');
    };

    return (
        <>
            <AppBar
                id="bytebank-header"
                position={"sticky"}
                sx={{
                    transition: "all 0.3s ease",
                    boxShadow: "none",
                    borderBottom: "1px solid rgb(199 201 145 / 20%)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            className={'link'}
                            onClick={() => navigate("/")}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                filter: `${colors['logo.filter']}`
                            }}
                        >
                            <img
                                src="/logo.svg"
                                className="logo"
                                id="bytebank-logo"
                                alt="Bytebank logo"
                            />
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: "block", md: "none" } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigate(page.route);
                                        }}
                                    >
                                        <Typography
                                            sx={{ textAlign: "center", textTransform: "capitalize" }}
                                        >
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box
                            className={'link'}
                            onClick={() => navigate("/")}
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                width: "80%",
                                justifyContent: "center",
                                filter: `${colors['logo.filter']}`
                            }}
                        >
                            <img
                                src="/logo.svg"
                                className="logo"
                                id="bytebank-logo"
                                alt="Bytebank logo"
                            />
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                justifyContent: "center",
                                textTransform: "capitalize",
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map((page) => (
                                <BytebankButton
                                    key={page.name}
                                    label={page.name}
                                    onClick={() => navigate(page.route)}
                                    sx={{ my: 2, display: "block", textTransform: "capitalize" }}
                                    variant="text"
                                    color={"primary"}
                                />
                            ))}
                        </Box>

                        <Box display={'flex'} flex={'none'} gap={1}>
                            {!isLogged ? (<>
                                <Box sx={{ display: { xs: "none", md: "flex" } }} gap={1}>
                                    <BytebankButton
                                        onClick={() => setOpenRegisterModal(true)}
                                        label="Crie uma conta"
                                        color="primary"
                                        variant="contained"
                                    />
                                    <BytebankButton
                                        onClick={() => setOpenLoginModal(true)}
                                        label="Entre"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </Box>
                                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                                    <Box display={'flex'}>
                                        <IconButton size="large" color="inherit" onClick={() => setOpenRegisterModal(true)}>
                                            <AppRegistrationRoundedIcon></AppRegistrationRoundedIcon>
                                        </IconButton>
                                        <IconButton size="large" color="inherit" onClick={() => setOpenLoginModal(true)}>
                                            <LoginIcon></LoginIcon>
                                        </IconButton>
                                    </Box>

                                </Box>
                            </>
                            ) : (
                                <>
                                    <Tooltip title="Gerenciar conta">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar sx={{ bgcolor: colors["lime.400"] }} alt={user?.name} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting.name} onClick={setting.action}>
                                                <Typography sx={{ textAlign: "center" }}>
                                                    {setting.name}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            )
                            }
                            <BytebankToggleButton />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <BytebankRegisterModal open={openRegisterModal} onClose={closeRegisterModal} onSubmit={handleRegisterModal} openModal={handleModalStates} />
            <BytebankLoginModal open={openLoginModal} onClose={closeLoginModal} onSubmit={handleLoginModal} openModal={handleModalStates} />
            <BytebankSnackbar open={isSnackbarOpen} data={snackbarData} onClose={closeSnackbar} />
        </>
    );
}
