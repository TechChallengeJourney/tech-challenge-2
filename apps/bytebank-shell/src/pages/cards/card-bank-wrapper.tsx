import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BytebankCard, BytebankText } from "@repo/ui";
import {
  CardDetails,
  CardActions,
  CardHeader,
  CardVisual,
  CardNavigation,
} from "./card-bank-carousel";

export interface BytebankCardContainerProps {
  cards: any[];
  refetchCards: () => void;
  blocked?: boolean;
  error?: string | null;
  loading?: boolean;
}

export const BytebankCardWrapper: React.FC<BytebankCardContainerProps> = ({
  cards,
  refetchCards,
  error,
  loading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasCards = cards.length > 0;
  const currentCard = hasCards ? cards[currentIndex] : null;

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

  if (loading) {
    return (
      <Box mt={4} textAlign="center">
        <BytebankText variant="md" color="text.primary">
          Carregando cartões...
        </BytebankText>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} textAlign="center">
        <BytebankText variant="md" color="error">
          Erro ao carregar cartões: {error}
        </BytebankText>
      </Box>
    );
  }

  if (!hasCards) {
    return (
      <Box mt={4} textAlign="center">
        <BytebankText variant="md" color="text.primary">
          Você ainda não possui cartão cadastrado.
        </BytebankText>
      </Box>
    );
  }

  return (
    <BytebankCard variant="outlined">
      <Box
        display="flex"
        gap={4}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "stretch" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        maxWidth={{ xs: "90vw" }}
        width={{ xs: "90vw", md: "90vw", lg: "68vw" }}
        m="26px"
      >
        <Box
          flex={1}
          m={{ xs: 1, md: 4 }}
          sx={{ width: "100%", maxWidth: 350 }}
          mt={{ xs: "20px" }}
        >
          <CardHeader variant={currentCard?.variant} />
          <CardVisual card={currentCard} />
        </Box>

        <Box flex={2}>
          <CardNavigation onPrev={handlePrev} onNext={handleNext} />
          <CardDetails card={currentCard} />
          <CardActions
            cardId={currentCard?._id || ""}
            isBlocked={!!currentCard?.blocked}
            onCardUpdate={refetchCards}
          />
        </Box>
      </Box>
    </BytebankCard>
  );
};
