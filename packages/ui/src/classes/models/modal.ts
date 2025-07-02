import { ModalProps } from "@mui/material";

export interface BytebankModalProps extends ModalProps {
    title: string;
    illustrationShow?: boolean;
    fullHeight?: boolean;
    illustration?: string
    illustrationSize?: 'sm' | 'md' | 'lg';
  }
  