import React from "react";
import { Box } from "@mui/material";
import { useCards, useUser } from "@repo/data-access";

import { BytebankBalanceCard } from "../../components/balance-card/balance-card";
import { BytebankCardContainer } from "./card-bank-container";
import { CardsInfoWidgets } from "./cards-info-widgets";
import { BytebankNewCardBank } from "./card-bank-new";

export const BytebankCardsPage: React.FC = () => {
  const { user } = useUser();
  const userId = user?._id;

  const { cards, loading, error, refetchCards } = useCards(userId ?? "");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        justifyContent: { xs: "center", md: "flex-start" },
        minHeight: { xs: "100vh", md: "auto" },
        minWidth: { xs: "100vw", md: "auto" },
        maxWidth: { xs: "90vw", md: "auto" },
        ml: { xs: 0, md: "30px" },
        mb: { xs: "20px", md: "20px" }, //<----parei aqui
      }}
    >
      <BytebankBalanceCard />
      <Box
        mb={{ xs: "37px", md: "77px" }}
        mt={{ xs: "37px", md: "77px" }}
        maxWidth={{ xs: "100vw", md: "90vw" }}
      >
        <CardsInfoWidgets cards={cards} loading={loading} error={error} />
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        alignItems={{ xs: "center", md: "center" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        width="100%"
      >
        <BytebankCardContainer
          cards={cards}
          loading={loading}
          error={error}
          refetchCards={refetchCards}
        />
        <Box mt={{ xs: "20px", md: "20px", lg: "0" }} width={{ xs: "95vw", md: "100%", lg: "250px" }}>
          <BytebankNewCardBank />
        </Box>
      </Box>
    </Box>
  );
};
