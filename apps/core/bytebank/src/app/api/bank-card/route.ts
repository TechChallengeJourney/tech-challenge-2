import { NextResponse } from 'next/server';

import { BankCard } from '@bytebank/shared'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


interface ErrorResponse {
    error: string;
}

export const GET = async (request: Request): Promise<NextResponse<BankCard[] | ErrorResponse>> => {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        const response = await fetch(`${apiUrl}/cards?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.length > 0) {
            return NextResponse.json(data, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'Este usuário não possui cartões cadastrados!' },
                { status: 401 }
            );
        }
    } catch {
        return NextResponse.json({ error: 'Ocorreu um erro, tente novamente mais tarde por favor!' }, { status: 500 });
    }
}