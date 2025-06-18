import { JSX } from "react";
import { Card } from '@mui/material';
import { colorsPalette } from "../../styles/palette";
import { useTheme } from "../../contexts/theme.context";

export interface BytebankCardProps {
    bgcolor?: string;
    radius?: 'sm' | 'md' | 'lg';
    variant?: "elevation" | "outlined" | undefined;
    className?: string;
    children?: React.ReactNode;
    styles?: React.CSSProperties;
}

export enum BytebankCardRadius {
    sm = '5px',
    md = '10px',
    lg = '14px',
}

export function BytebankCard({
    bgcolor,
    radius = 'md',
    variant = 'outlined',
    children,
    className,
    styles
}: BytebankCardProps): JSX.Element {
    const { isDarkMode } = useTheme();
    const palette = !isDarkMode ? colorsPalette.light : colorsPalette.dark;
    const cardColor = bgcolor ?? palette["background.card"];

    return (
        <Card
            variant={variant}
            sx={{ background: cardColor, borderRadius: BytebankCardRadius[radius], ...styles }}
            className={`${className}`}
        >
            {children}
        </Card>
    );
}