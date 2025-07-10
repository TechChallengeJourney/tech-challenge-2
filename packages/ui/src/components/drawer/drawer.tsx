import { BytebankDrawerProps } from "../../classes/models/drawer";
import { Box, Drawer, Typography } from "@mui/material";

export function BytebankDrawer({title, children, anchor, open, onClose}: BytebankDrawerProps) {
    return (
        <Drawer  anchor={anchor} open={open} onClose={onClose}  >
            <Box px={2}>
                <Typography variant="h6" component="div" sx={{ paddingTop: 2 }}>
                {title}
                </Typography>
                {children}
            </Box>
        </Drawer>
    );
}