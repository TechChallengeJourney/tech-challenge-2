import { Card } from '@mui/material';

import styles from './card.module.scss';
import { palette } from '../../shared';


const bgIllustrationConfig = {
    primary: 'primary.main',
    grey: 'grey.300',
} as const;

type BgIllustration = keyof typeof bgIllustrationConfig;

export interface BytebankCardProps {
    bgcolor?: string;
    radius?: 'sm' | 'md' | 'lg';
    variant?: 'elevation' | 'outlined';
    className?: string;
    children?: React.ReactNode;
    bgIllustration?: BgIllustration;
}

export enum BytebankCardRadius {
    sm = '5px',
    md = '10px',
    lg = '14px',
}

export function BytebankCard({
    bgcolor = '#FFF',
    radius = 'md',
    variant = 'outlined',
    children,
    className,
    bgIllustration
}: BytebankCardProps) {
    let bgClass = '';

    if (bgIllustration) {
        bgcolor = palette[bgIllustrationConfig[bgIllustration]];
        bgClass = `${styles.bgConfig} ${styles[`bgConfig--${bgIllustration}`]}`
    }

    return (
        <Card
            variant={variant}
            sx={{ background: bgcolor, borderRadius: BytebankCardRadius[radius] }}
            className={`${className} ${bgClass && bgClass}`}
        >
            {children}
        </Card>
    );
}