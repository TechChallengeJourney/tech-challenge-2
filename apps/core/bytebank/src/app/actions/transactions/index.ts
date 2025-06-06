import { Transaction } from '@bytebank/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTransactions = async (userId: string) => {
    return await fetch(`${API_URL}/extract?userId=${userId}`, { method: 'GET' });
}

export const createTransaction = async (value: Transaction) => {
    return fetch(`${API_URL}/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...value }),
    });
}

export const updateTransaction = async (data: Transaction) => {
    return fetch(`${API_URL}/extract/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
    });
}

export const deleteTransaction = async (id: string) => {
    return fetch(`${API_URL}/extract/${id}`, { method: 'DELETE' });
}
