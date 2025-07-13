import { clientApi } from "../helpers/client-api";

export interface ErrorResponse {
  error: string;
}

export async function DeleteCardBank(id: string): Promise<true | ErrorResponse> {
  try {
    const rawToken = sessionStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;

    if (!token) {
      return { error: "Usuário não autenticado." };
    }

    await clientApi.delete(`/cards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return { error: "Cartão não encontrado." };
    }

    return { error: "Erro ao deletar cartão. Tente novamente mais tarde." };
  }
}
