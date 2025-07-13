import { useState } from "react";
import { BlockCardBank } from "../api/block-card-bank";

export function useBlockCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlock = async (id: string) => {
    setLoading(true);
    setError(null);

    const result = await BlockCardBank(id);

    if ("success" in result && result.success === true) {
      setLoading(false);
      return true;
    } else if ("error" in result) {
      setError(result.error);
      setLoading(false);
      return false;
    } else {
      setError("Unknown error");
      setLoading(false);
      return false;
    }
  };

  return { handleBlock, loading, error };
}
