import React, { useState } from "react";
import { CreditCard } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  BytebankButton,
  BytebankCard,
  BytebankCardBank,
  BytebankNavigation,
  BytebankText,
} from "@repo/ui";


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


export const BytebankCardSection: React.FC<{
  cards: any[];
  loading: boolean;
  error: any;
}> = ({ cards, loading, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleMockedCards = () => {
    if (!cards || cards.length === 0) {
      return cardList;
    }
    return cards;
  };

  const displayedCards = handleMockedCards();

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

  const currentCard = displayedCards[currentIndex];

  const cardDetails = () => (
    <Box>
      <Box
        display="flex"
        mb={{ xs: 2, md: 1 }}
        mt={2}
        justifyContent={{ xs: "center", md: "flex-end" }}
      >
        <BytebankNavigation onPrev={handlePrev} onNext={handleNext} />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <BytebankText variant="xs">Cartão de crédito</BytebankText>
        <BytebankText variant="xs">
          **** **** **** {currentCard?.cardNumber.slice(-4)}
        </BytebankText>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <BytebankText variant="xs">Limite do cartão</BytebankText>
        <BytebankText variant="xs" fontWeight="bold">
          {currentCard?.limit}
        </BytebankText>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <BytebankText variant="xs">Data de expiração</BytebankText>
        <BytebankText variant="xs" fontWeight="bold">
          {currentCard?.expirationDate}
        </BytebankText>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <BytebankText variant="xs">Valor utilizado</BytebankText>
        <BytebankText variant="xs" fontWeight="bold">
          {currentCard?.expend ?? "R$ 0,00"}
        </BytebankText>
      </Box>
    </Box>
  );

  const buttonsWrapper = () => (
    <Box>
      <Box
        mt={{ xs: 3, md: 3 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box width="100%">
          <BytebankButton
            fullWidth
            variant="contained"
            color="primary"
            label="Bloquear cartão"
            onClick={() => console.log("Bloquear cartão")}
          />
        </Box>

        <Box mt={2} width="100%">
          <BytebankButton
            fullWidth
            color="primary"
            variant="outlined"
            label="Marcar cartão como principal"
            onClick={() => console.log("Marcar como principal")}
          />
        </Box>

        <Box mt={2}>
          <BytebankButton
            label="Excluir cartão"
            color="primary"
            variant="text"
            onClick={() => console.log("Excluir cartão")}
            sx={{
              textDecoration: "underline",
              textTransform: "none",
              fontWeight: 500,
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  const cardsWrapper = () => (
    <Box>
      <BytebankCardBank variant="Físico" details={currentCard} />
    </Box>
  );

  const cardHeader = () => (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={{ xs: "center", md: "flex-start" }}
      alignItems="center"
      gap="10px"
      mb={4}
    >
      <CreditCard fontSize="large" />
      <BytebankText variant="md" fontWeight="bold">
        Byte Platinum
      </BytebankText>
    </Box>
  );

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
          {cardHeader()}
          {cardsWrapper()}
        </Box>
        <Box flex={1} m={{ xs: 1, md: 4 }}>
          {cardDetails()}
          {buttonsWrapper()}
        </Box>
      </Box>
    </BytebankCard>
  );
};
