import { Card } from "../classes/models/cards";
import { clientApi } from "../helpers/client-api";

export interface ErrorResponse {
  error: string;
}

export async function GetCardsBank(
  userId: string
): Promise<Card[] | ErrorResponse> {
  try {
    const rawToken = sessionStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;

    if (!token) {
      return { error: "Usuário não autenticado." };
    }

    const response = await clientApi.get<Card[]>("/cards", {
      params: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response?.data;

    if (data.length > 0) {
      return data;
    } else {
      return {
        error: "Este usuário não possui cartões cadastrados!",
      };
    }
  } catch (error) {
    console.error("Erro ao buscar cartões do usuário:", error);
    return {
      error: "Ocorreu um erro, tente novamente mais tarde por favor!",
    };
  }
}
