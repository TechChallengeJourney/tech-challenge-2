import { useState } from "react";
import { DeleteCardBank } from "../api/delete-card-bank";

export function useDeleteCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (cardId: string) => {
    setLoading(true);
    setError(null);

    const result = await DeleteCardBank(cardId);

    if (result === true) {
      setLoading(false);
      return true;
    } else {
      setError(result.error);
      setLoading(false);
      return false;
    }
  };

  return { handleDelete, loading, error };
}
