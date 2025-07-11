import React from "react";
import {
  BytebankCardBank,
  BytebankCard,
  BytebankText,
  BytebankButton,
} from "@repo/ui";
import { Box } from "@mui/material";

export const BytebankCardSection: React.FC = () => {



  const cardDetails = () => {
    return (
      <>
        <Box display="flex" justifyContent="space-between" width="500px">
          <BytebankText variant="xs">Cartão de crédito</BytebankText>
          <BytebankText variant="xs">**** **** **** 3251</BytebankText>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Limite do cartão</BytebankText>
          <BytebankText variant="xs" fontWeight="bold">
            R$ 35.000,00
          </BytebankText>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Data de expiração</BytebankText>
          <BytebankText variant="xs" fontWeight="bold">
            25/03/2028
          </BytebankText>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <BytebankText variant="xs">Valor utilizado</BytebankText>
          <BytebankText variant="xs" fontWeight="bold">
            R$1.759,20
          </BytebankText>
        </Box>
      </>
    );
  };

   const buttonsWrapper = () => {
    return (
      <>
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
      </>
    );
  };

 
  const cards = () => {
    return (
      <BytebankCardBank
        variant="Físico"
        details={{
          name: "Eloisa Fagundes",
          cardNumber: "1234567890123456",
          expirationDate: "12/25",
        }}
      />
    );
  };

  return (
    <BytebankCard variant="outlined">
      <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
        <Box flex={1} m={{ xs: 1, md: 4 }} alignContent="center">
          {cards()}
        </Box>
        <Box flex={1} m={{ xs: 1, md: 4 }}>
          {cardDetails()}
          {buttonsWrapper()}
        </Box>
      </Box>
    </BytebankCard>
  );
};
