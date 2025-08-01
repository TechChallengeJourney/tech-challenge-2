import { AppBar, Toolbar, Box } from "@mui/material";
import { BytebankButton } from "@repo/ui";
import { useTheme } from "@repo/utils";
import { useEffect } from "react";

export default function Header() {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const setHeaderStyle = () => {
            const header = document.getElementById("bytebank-header");
            if (!header) return;

            if (!isDarkMode) {
                if (window.scrollY > 50) {
                    header.style.background = "rgb(255 255 255 / 85%)";
                } else {
                    header.style.background = "transparent";
                }
            } else {
                if (window.scrollY > 50) {
                    header.style.background = "rgb(16 18 9 / 70%)";
                } else {
                    header.style.background = "transparent";
                }
            }
        };

        setHeaderStyle();
        window.addEventListener("scroll", setHeaderStyle);
        return () => window.removeEventListener("scroll", setHeaderStyle);
    }, [isDarkMode]);

    return (
        <AppBar position={"fixed"}
            id="bytebank-header"
            sx={{
                background: 'transparent',
                width: "100vw",
                transition: "all 0.3s ease",
                boxShadow: "none",
                minHeight: "60px",
                borderBottom: "1px solid rgb(199 201 145 / 20%)",
                backdropFilter: "blur(8px)",
            }}>
            <Toolbar sx={{ minHeight: "60px !important", }}>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <a href='/'>
                        <img
                            src={'/logo.svg'}
                            className="logo"
                            id="bytebank-logo"
                            alt="Bytebank logo"
                        />
                    </a>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <a href='https://bytebank-demo.vercel.app/' target="_blank">
                        <BytebankButton color="secondary" variant="contained" label={'Criar uma conta'} />
                    </a>
                </Box>
            </Toolbar>
        </AppBar>
    );
}