import { api } from "../helpers/api";

export interface BlockCardResponse {
  _id: string;
  userId: string;
  cardNumber: string;
  name: string;
  functions: string[];
  variant: string[];
  expirationDate: string;
  cvv: number;
  flag: string;
  blocked: boolean;
}

export interface ErrorResponse {
  error: string;
}

export async function BlockCardBank(
  cardId: string
): Promise<BlockCardResponse | ErrorResponse> {
  try {
    const response = await api.put<BlockCardResponse>(
      `/cards/${cardId}/block`,
      {
        params: { id: cardId },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return { error: "Cartão não encontrado." };
    }

    return { error: "Erro ao bloquear o cartão. Tente novamente mais tarde." };
  }
}
