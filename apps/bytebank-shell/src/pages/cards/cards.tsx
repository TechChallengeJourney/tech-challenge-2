import React from "react";
import { Box } from "@mui/material";
import { useCards, useUser } from "@repo/data-access";

import { BytebankBalanceCard } from "../../components/balance-card/balance-card";
import { BytebankCardWrapper } from "./card-bank-wrapper";
import { CardsInfoWidgets } from "./cards-info-widgets";
import { BytebankNewCardBank } from "./card-bank-new";
import { CardData } from "./models/card-model";

export const BytebankCardsPage: React.FC = () => {
  const { user } = useUser();
  const userId = user?._id;
  const { cards, error, loading, refetchCards } = useCards(userId ?? "");

  const getTotalLimit = (array: CardData[]): number => {
    return array.reduce((total, item) => total + item.limit, 0);
  };

  const formatLimitCurrency = (limit: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(limit);
  };

  const total = getTotalLimit(cards);
  const totalFormattedLimit = formatLimitCurrency(total);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
    >
      <Box
        width="100%"
        px={{ xs: 2, md: 4 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <BytebankBalanceCard />

        <Box
          mt="26px"
          width="100%" 
          display="flex"
          justifyContent="center"
        >
          <CardsInfoWidgets
            cards={cards}
            totalFormattedLimit={totalFormattedLimit}
          />
        </Box>

        <Box
          mt={{ xs: "36px", md: "36px" }}
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }} // linha no desktop
          justifyContent="space-between"
          alignItems="flex-start"
          width="100%"
          gap={2}
        >
          {/* Coluna 1: Cartões */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            width={{xs:"100%", md:"100%"}}
          >
            <BytebankCardWrapper
              cards={cards}
              refetchCards={refetchCards}
              error={error}
              loading={loading}
            />
          </Box>

          {/* Coluna 2: Criar novo cartão */}
          <Box
            width={{ xs: "100%", lg: "400px" }}
            display="flex"
            flexDirection="column"
            alignSelf="center"
            mb={{xs: "36px"}}
          >
            <BytebankNewCardBank />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
