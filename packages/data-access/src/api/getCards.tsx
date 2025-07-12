import { Card } from '../classes/models/cards';

import client from './client';

export interface ErrorResponse {
  error: string;
}

export async function getCards(userId: string): Promise<Card[] | ErrorResponse> {
  try {
    const response = await client.get<Card[]>(`/cards`, {
      params: { userId },
    });

    const data = response.data;

    if (data.length > 0) {
      return data;
    } else {
      return {
        error: 'Este usuário não possui cartões cadastrados!',
      };
    }
  } catch (error) {
    console.error('Erro ao buscar cartões do usuário:', error);
    return {
      error: 'Ocorreu um erro, tente novamente mais tarde por favor!',
    };
  }
}
