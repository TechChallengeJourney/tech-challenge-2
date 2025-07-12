import { useEffect, useState } from 'react';
import { getCards } from '../api/getCards';
import { Card } from '../classes/models/cards';

export function useCards(userId: string) {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    const loadCards = async () => {
      setLoading(true);
      const result = await getCards(userId);

      if ('error' in result) {
        setError(result.error);
        setCards([]);
      } else {
        setCards(result);
        setError(null);
      }

      setLoading(false);
    };

    loadCards();
  }, [userId]);

  return { cards, error, loading };
}
