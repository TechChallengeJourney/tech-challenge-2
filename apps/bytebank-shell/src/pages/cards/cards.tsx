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
    console.log(array);
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
      minWidth="100%"
      display="flex"
      alignItems={{ xs: "center", md: "center" }}
      justifyContent={{ xs: "center", md: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "center" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <BytebankBalanceCard />
        <Box
          mt="36px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="95vw"
        >
          <CardsInfoWidgets
            cards={cards}
            totalFormattedLimit={totalFormattedLimit}
          />
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "center", md: "center" }}
          justifyContent={{ xs: "center", md: "space-between" }}
          mt={{ xs: "36px", md: "36px" }}
        >
          <BytebankCardWrapper
            cards={cards}
            refetchCards={refetchCards}
            error={error}
            loading={loading}
          />
          <Box
            mt={{ xs: "26px" }}
            ml={{ xs: "0", md: "26px" }}
            width={{ xs: "95vw", md: "92vw", lg: "426px" }}
          >
            <BytebankNewCardBank />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
