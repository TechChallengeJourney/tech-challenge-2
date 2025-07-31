import { AppBar, Toolbar, Box, colors } from "@mui/material";
import { BytebankButton } from "@repo/ui";

export default function Header() {    
    return (
        <AppBar position={"sticky"}
        sx={{
            background: '#ffffffc4',
            width: "100vw",
            transition: "all 0.3s ease",
            boxShadow: "none",
            borderBottom: "1px solid rgb(199 201 145 / 20%)",
            backdropFilter: "blur(8px)",
        }} elevation={1}>
            <Toolbar>
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
                    {/* <Button color="inherit">Início</Button> */}
                    <a href='https://bytebank-demo.vercel.app/' target="_blank">
                    <BytebankButton color="secondary" variant="contained" label={'Quero criar uma conta'} />
                    </a>
                    {/* <IconButton color={"primary"} size="small" sx={{ bgcolor: 'grey.100' }}>
                        <LightModeIcon />
                    </IconButton> */}
                </Box>
            </Toolbar>
        </AppBar>
);
}