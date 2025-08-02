import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { BytebankCard, BytebankText } from "@repo/ui";
import {
  CardDetails,
  CardActions,
  CardHeader,
  CardVisual,
  CardNavigation,
} from "./card-bank-carousel";
import { CardEmptyState } from "./card-bank-carousel/card-empty-state";

export interface BytebankCardContainerProps {
  cards: any[];
  refetchCards: () => void;
  blocked?: boolean;
  error?: string | null;
  loading?: boolean;
}

export const BytebankCardList: React.FC<BytebankCardContainerProps> = ({
  cards,
  refetchCards,
  error,
  loading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasCards = cards.length >= 1;
  const currentCard = hasCards ? cards[currentIndex] : null;

  const hasShownLoading = useRef(false);

  useEffect(() => {
    if (loading) {
      hasShownLoading.current = true;
    }
  }, [loading]);

  useEffect(() => {
    if (currentIndex >= cards.length && cards.length > 0) {
      setCurrentIndex(cards.length - 1);
    }
  }, [cards.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <BytebankCard variant="outlined">
      {loading && !hasShownLoading.current && (
        <CardEmptyState text="Carregando cartões..." />
      )}

      {error && (
        <CardEmptyState text="Erro ao carregar cartões! Tente mais tarde." />
      )}

      {!loading && !error && !hasCards && (
        <CardEmptyState text="Você ainda não possui cartão cadastrado." />
      )}

      {!loading && !error && hasCards && (
        <Box
          display="flex"
          gap={{xs: 2, sm: 2, md:4}}
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "stretch" }}
          justifyContent={{ xs: "center", md: "flex-start" }}
          m={{xs: 2, sm: 2, md:4}}
        >
          <Box
            flex={1}
            sx={{ width: "100%", maxWidth: 350 }}
            mt={{ xs: 2 }}
            mr={{xs: 0, sm: 2, md:4}}
          >
            <CardHeader variant={currentCard?.variant} />
            <CardVisual card={currentCard} />
          </Box>

          <Box flex={2} alignSelf={{xs: "stretch", sm: "center", md: "center"}}>
            <CardNavigation onPrev={handlePrev} onNext={handleNext} cards={cards} />
            <CardDetails card={currentCard} />
            <CardActions
              cardId={currentCard?._id || ""}
              isBlocked={!!currentCard?.blocked}
              onCardUpdate={refetchCards}
            />
          </Box>
        </Box>
      )}
    </BytebankCard>
  );
};
