import { JSX } from "react";
import { Card } from '@mui/material';

import './card.module.scss';
import { colorsPalette } from "../../styles/palette";
import { useTheme } from "../../contexts/theme.context";

export interface BytebankCardProps {
    bgcolor?: string;
    radius?: 'sm' | 'md' | 'lg';
    variant?: 'elevation' | 'outlined';
    className?: string;
    children?: React.ReactNode;
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
}: BytebankCardProps): JSX.Element {
    const { isDarkMode } = useTheme();
    const palette = !isDarkMode ? colorsPalette.light : colorsPalette.dark;
    const cardColor = bgcolor ?? palette["background.card"];

    return (
        <Card
            variant={variant}
            sx={{ backgroundColor: cardColor, borderRadius: BytebankCardRadius[radius] }}
            className={`${className}`}
        >
            {children}
        </Card>
    );
}