import React from "react";
import { Box } from "@mui/material";
import { BytebankText } from "@repo/ui";

export interface CardData {
  name: string;
  cardNumber: number;
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

function maskCardNumber(cardNumber: string | number): string {
  const cardNumberStr = String(cardNumber);
  const lastFourDigits = cardNumberStr.slice(-4);
  const maskedCardNumber = "**** **** ****";

  return `${maskedCardNumber} ${lastFourDigits}`;
}

function formatExpirationDate(expirationDate: string): string {
  const date = new Date(expirationDate);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${month}/${year}`;
}

function translateFunctionType(functions: string): string {
  if (functions === "debit") return "Débito";
  if (functions === "credit") return "Crédito";
  return functions;
}

export const CardDetails: React.FC<{ card: CardData }> = ({ card }) => (
  <Box>
    <Box display="flex" justifyContent="space-between">
      <BytebankText variant="xs">
        Cartão de {translateFunctionType(card?.functions[0] ?? "") || "****"}
      </BytebankText>
      <BytebankText variant="xs">
        {maskCardNumber(card?.cardNumber) || "**** **** **** ****"}
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
        {formatExpirationDate(card?.expirationDate) || "0/00"}
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
