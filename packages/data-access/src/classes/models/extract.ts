import { Transaction } from './transaction';

export interface ExtractProps {
    pagination: string;
    data: Transaction[];
}

export interface Extract {
    mounth: string;
    data: Transaction[];
}