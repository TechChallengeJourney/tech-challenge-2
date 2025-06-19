import styles from "./header.module.scss";
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
} from "@repo/ui";

const settings = [
  {
    name: "Minha conta",
    action: () => {
      console.log("minha conta");
    },
  },
  { name: "Sair", action: () => console.log("logout") },
];

export function BytebankHeader() {
  const isLogged = true;
  const pages = isLogged ? loggedPages : unloggedPages;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const navigate = useNavigate();

  return (
    <AppBar
      id="bytebank-header"
      position={"sticky"}
      sx={{
        transition: "all 0.3s ease",
        boxShadow: "none",
        borderBottom: "1px solid rgb(134 134 132 / 15%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            className={styles.link}
            onClick={() => navigate("/")}
            sx={{
              display: { xs: "none", md: "flex" },
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
            className={styles.link}
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              width: "80%",
              justifyContent: "center",
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
          <Box sx={{ flexGrow: 0 }} display={"flex"} gap={1}>
            <Tooltip title="Gerenciar conta">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <BytebankToggleButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
