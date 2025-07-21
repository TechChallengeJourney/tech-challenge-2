import { api } from "@repo/data-access";
export const fetchWidgetData = async <T = unknown>(widget: string, userId: string): Promise<T> => {
    try {
        const response = await api.get(`/widgets/${widget}/?userId=${userId}`);
        return response.data as T;
    } catch (error) {
        console.error('Erro ao buscar widget:', error);
        throw error;
    }
};