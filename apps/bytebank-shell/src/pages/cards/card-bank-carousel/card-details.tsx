import React from "react";
import { Box } from "@mui/material";
import { BytebankText } from "@repo/ui";

export interface CardData {
  name: string;
  cardNumber: string;
  expirationDate: string;
  limit: string | number;
  expend?: string;
  blocked: boolean;
  flag: string;
  functions: string[];
  userId: string | null;
  variant: string;
  cvv: number | null;
  _id: string | null;
}

export const CardDetails: React.FC<{ card: CardData }> = ({ card }) => (
  <Box>
    <Box display="flex" justifyContent="space-between">
      <BytebankText variant="xs">Cartão de crédito</BytebankText>
      <BytebankText variant="xs">
        **** **** **** {card?.cardNumber?.slice(-4)}
      </BytebankText>
    </Box>

    <Box display="flex" justifyContent="space-between">
      <BytebankText variant="xs">Limite do cartão</BytebankText>
      <BytebankText variant="xs" fontWeight="bold">
        {card?.limit ?? "R$ 0,00"}
      </BytebankText>
    </Box>

    <Box display="flex" justifyContent="space-between">
      <BytebankText variant="xs">Data de expiração</BytebankText>
      <BytebankText variant="xs" fontWeight="bold">
        {card?.expirationDate}
      </BytebankText>
    </Box>

    <Box display="flex" justifyContent="space-between">
      <BytebankText variant="xs">Valor utilizado</BytebankText>
      <BytebankText variant="xs" fontWeight="bold">
        {card?.expend ?? "R$ 0,00"}
      </BytebankText>
    </Box>
  </Box>
);