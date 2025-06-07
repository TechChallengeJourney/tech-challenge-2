import { AlertColor } from "@mui/material";

export interface BytebankSnackbarProps {
    open: boolean; 
    onClose: () => void;
    data: SnackbarData | null;
}

export interface SnackbarData {
    status: AlertColor; 
    message?: string;
}