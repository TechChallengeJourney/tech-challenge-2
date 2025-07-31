import { BytebankDrawerProps } from "../../classes/models/drawer";
import { Box, Drawer } from "@mui/material";
import { BytebankText } from "../text/text";
import { BytebankDivider } from "../divider/divider";

export function BytebankDrawer({title, children, anchor, open, onClose}: BytebankDrawerProps) {
    return (
        <Drawer anchor={anchor} open={open} onClose={onClose} color="#fff" >
            <Box minWidth={'25em'}>
                <Box px={4} py={3}>
                <BytebankText variant={'md'} sx={{ paddingTop: 2, paddingBottom: 2, fontWeight: 600 }}>
                {title}
                </BytebankText>
                </Box>
                <BytebankDivider type="horizontal" />
                <Box px={4} py={2}>
                {children}
                </Box>
            </Box>
        </Drawer>
    );
}