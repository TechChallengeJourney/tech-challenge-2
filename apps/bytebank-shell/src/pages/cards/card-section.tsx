import React from "react";
import { Box } from "@mui/material";''
import {
  BytebankCardBank,
  BytebankCard,
  BytebankText,
  BytebankButton,
} from "@repo/ui";

export const BytebankCardSection: React.FC = () => {
  const cardDetails = () => {
    return (
      <Box display="flex" flexDirection="column" gap={2} p={2} flex={1}>
        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Cartão de crédito</BytebankText>
          <BytebankText variant="xs">**** **** **** 3251</BytebankText>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Limite do cartão</BytebankText>
          <BytebankText variant="xs">R$ 35.000,00</BytebankText>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Data de expiração</BytebankText>
          <BytebankText variant="xs">25/03/2028</BytebankText>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Valor utilizado</BytebankText>
          <BytebankText variant="xs">R$1.759,20</BytebankText>
        </Box>

        <Box mt={3}>
          <BytebankButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => console.log("true")}
            label="Bloquear cartão"
          />
        </Box>

        <Box>
          <BytebankButton
            fullWidth
            variant="outlined"
            color="white"
            onClick={() => console.log("true")}
            label="Marcar cartão como principal"
          />
        </Box>

        <Box textAlign="center" mt={1}>
          <BytebankButton
            label="Excluir cartão"
            onClick={() => console.log("true")}
            sx={{ my: 2, display: "block", textTransform: "capitalize" }}
            variant="text"
            color={"primary"}
          />
        </Box>
      </Box>
    );
  };

  const cards = () => {
    return (
      <Box flex={1} p={2}>
        <BytebankCardBank
          variant="Físico"
          details={{
            name: "Eloisa Fagundes",
            cardNumber: "1234567890123456",
            expirationDate: "12/25",
          }}
        />
      </Box>
    );
  };

  return (
    <BytebankCard variant={"outlined"} sx={{ width: "100% !important" }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        width="100%"
      >
        {cards()}
        {cardDetails()}
      </Box>
    </BytebankCard>
  );
};
