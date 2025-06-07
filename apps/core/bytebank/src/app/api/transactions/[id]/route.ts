import { NextResponse } from 'next/server';
import {
    fetchTransactions,
    updateTransaction,
    deleteTransaction,
} from '../../../actions/transactions';

export async function GET(request: Request) {
    try {
        const data = await request.json();

        if (!data) {
            return NextResponse.json(
                { error: 'Erro ao buscar extrato' },
                { status: 500 }
            );
        }

        const response = await fetchTransactions(data.userId);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar extrato' },
                { status: 500 }
            );
        }

        return NextResponse.json(data, {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching extract:', error);
        return NextResponse.json(
            { error: 'Ocorreu um erro, tente novamente mais tarde por favor!' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const response = await updateTransaction(data);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar transação' },
                { status: 500 }
            );
        }

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error) {
        console.error('Error update transaction:', error);
        return NextResponse.json(
            { error: 'Ocorreu um erro, tente novamente mais tarde por favor!' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        const response = await deleteTransaction(data);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Erro ao apagar transação' },
                { status: 500 }
            );
        }

        return NextResponse.json(data, {
            status: 200,
        });
    } catch (error) {
        console.error('Error delete transaction:', error);
        return NextResponse.json(
            { error: 'Ocorreu um erro, tente novamente mais tarde por favor!' },
            { status: 500 }
        );
    }
}

