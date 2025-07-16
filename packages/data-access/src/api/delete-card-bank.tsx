import { api } from "../helpers/api";

export interface ErrorResponse {
  error: string;
}

export async function DeleteCardBank(cardId: string): Promise<true | ErrorResponse> {
  try {

    await api.delete(`/cards/${cardId}`, {
      data: { id: cardId }
    });

    return true;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return { error: "Cartão não encontrado." };
    }

    return { error: "Erro ao deletar cartão. Tente novamente mais tarde." };
  }
}
