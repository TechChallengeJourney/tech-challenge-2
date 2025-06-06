'use client';
import './style.scss';

export interface DividerProps {
    type?: 'horizontal' | 'vertical';
    className?: string;
    color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'black';
}

export function BytebankDivider({
    type = 'horizontal',
    color = 'black',
    className
}: DividerProps) {
    return (
        <div className={`divider divider--${type} divider--${color} ${className}`}></div>
    );
}
