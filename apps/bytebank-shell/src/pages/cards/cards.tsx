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
        minHeight: { xs: "100vh", md: "auto" },
        minWidth: { xs: "100vw", md: "auto" },
        maxWidth: { xs: "50vw", md: "auto" },
        ml: { xs: 0, md: "70px" },
      }}
    >
      <BytebankBalanceCard />
      <Box mb={{ xs: "37px", md: "77px" }} mt={{ xs: "37px", md: "77px" }}>
        <CardsInfoWidgets cards={cards} loading={loading} error={error} />
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <BytebankCardContainer
          cards={cards}
          loading={loading}
          error={error}
          refetchCards={refetchCards}
        />
        <Box height={{ xs: "auto", md: "60%" }}>
          <BytebankNewCardBank />
        </Box>
      </Box>
    </Box>
  );
};
