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

const cardList = [
  {
    name: "Eloisa Fagundes",
    cardNumber: 1234567890123456,
    expirationDate: "2028-07-01T04:03:58.696Z",
    limit: "R$ 35.000,00",
    expend: "R$ 1.759,20",
    blocked: false,
    flag: "Visa",
    functions: ["credit"],
    userId: "1234569",
    variant: "Black",
    cvv: 123,
    _id: "6872fc727ebf3196e9604862",
  },
  {
    name: "Mia Colluci",
    cardNumber: 8797223517022612,
    expirationDate: "2028-07-01T04:03:58.696Z",
    limit: "R$ 5.000,00",
    expend: null,
    blocked: true,
    flag: "Elo",
    functions: ["debit"],
    userId: "6872b7609ef0a65b445ce20e",
    variant: "Platinum",
    cvv: 504,
    _id: "6872fc727ebf3196e9604862",
  },
    {
    name: "Roberta Prado",
    cardNumber: 827382478462764,
    expirationDate: "2027-06-01T04:03:58.696Z",
    limit: "R$ 2.000,00",
    expend: null,
    blocked: false,
    flag: "Elo",
    functions: ["credit"],
    userId: "6872b7609ef0a65b445ce20e",
    variant: "Gold",
    cvv: 123,
    _id: "6872fc727ebf3196e9604862",
  },
];

export interface BytebankCardContainerProps {
  cards: any[]; 
  refetchCards: () => void;
}

export const BytebankCardWrapper: React.FC<BytebankCardContainerProps> = ({
  cards,
  refetchCards,
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
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : cards.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < cards.length - 1 ? prev + 1 : 0
    );
  };

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
            cardId={currentCard?._id}
            onCardUpdate={refetchCards}
          />
        </Box>
      </Box>
    </BytebankCard>
  );
};
