import { useState, useCallback } from "react";

type FetchResponse<T> = {
  response: Response | null;
  json: T | null;
};

type RequestOptions = RequestInit;

export const useFetch = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (url: string, options?: RequestOptions): Promise<FetchResponse<T>> => {
    setError(null);
    setLoading(true);
    let response: Response | null = null;
    let json: T | null = null;

    try {
      response = await fetch(url, options);
      const parsed = await response.json();
      if (!response.ok) {
        throw new Error(parsed?.message || "Erro na requisição");
      }
      json = parsed;
      setData(json);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    error,
    loading,
    request,
  };
};
