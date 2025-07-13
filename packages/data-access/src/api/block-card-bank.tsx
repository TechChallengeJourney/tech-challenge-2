import { clientApi } from "../helpers/client-api";

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
  id: string
): Promise<BlockCardResponse | ErrorResponse> {
  try {
    const rawToken = sessionStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;

    if (!token) {
      return { error: "Usuário não autenticado." };
    }

    const response = await clientApi.put<BlockCardResponse>(
      `/cards/${id}/block`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
