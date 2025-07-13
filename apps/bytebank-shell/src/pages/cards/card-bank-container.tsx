import React, { useState } from "react";
import { Box } from "@mui/material";
import { BytebankCard, BytebankLinearProgress, BytebankText } from "@repo/ui";
import {
  CardDetails,
  CardActions,
  CardHeader,
  CardVisual,
  CardNavigation,
} from "./CardsBankCarousel";

const cardList = [
  {
    name: "Eloisa Fagundes",
    cardNumber: "1234567890123456",
    expirationDate: "03/2028",
    limit: "R$ 35.000,00",
    expend: "R$ 1.759,20",
    blocked: false,
    flag: "Desconhecida",
    functions: [],
    userId: null,
    variant: "Desconhecida",
    cvv: null,
    _id: null,
  },
  {
    name: "cartão teste 4",
    cardNumber: "8797223517022612",
    expirationDate: "07/2028",
    limit: "R$ 35.000,00",
    expend: null,
    blocked: false,
    flag: "Elo",
    functions: ["debit"],
    userId: "6872b7609ef0a65b445ce20e",
    variant: "platinum",
    cvv: 504,
    _id: "6872fc727ebf3196e9604862",
  },
];

export const BytebankCardContainer: React.FC<{
  cards: any[];
  loading: boolean;
  error: any;
}> = ({ cards, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const displayedCards = cards.length > 0 ? cards : cardList;
  const currentCard = displayedCards[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : displayedCards.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < displayedCards.length - 1 ? prev + 1 : 0
    );
  };

  // if (loading) {
  //   return (
  //     <Box p={4}>
  //       <BytebankLinearProgress />
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Box p={4}>
  //       <BytebankText variant="md" color="error">
  //         Ocorreu um erro ao carregar os cartões.
  //       </BytebankText>
  //     </Box>
  //   );
  // }

  return (
    <BytebankCard variant="outlined">
      <Box
        display="flex"
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "stretch" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        maxWidth={{ xs: "98vw" }}
        width={{ xs: "90vw", md: "60vw" }}
        m="10px"
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

        <Box flex={1} m={{ xs: 1, md: 4 }}>
          <CardNavigation onPrev={handlePrev} onNext={handleNext}/>
          <CardDetails card={currentCard} />
          <CardActions />
        </Box>
      </Box>
    </BytebankCard>
  );
};
