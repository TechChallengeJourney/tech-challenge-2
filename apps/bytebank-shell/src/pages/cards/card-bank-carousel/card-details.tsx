import React from "react";
import { Box } from "@mui/material";
import { BytebankText } from "@repo/ui";
import { CardData } from "../models/card-model";

function maskCardNumber(cardNumber: string | number): string {
  const cardNumberStr = String(cardNumber);
  const lastFourDigits = cardNumberStr.slice(-4);
  const maskedCardNumber = "**** ****";

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

const formatLimitCurrency = (limit: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(limit);
};

export const CardDetails: React.FC<{ card: CardData }> = ({ card }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignSelf="center">
        <BytebankText variant="sm">
          Cartão de {translateFunctionType(card?.functions[0] ?? "") || "****"}
        </BytebankText>
        <BytebankText variant="sm">
          {maskCardNumber(card?.cardNumber) || "**** **** ****"}
        </BytebankText>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <BytebankText variant="sm">Limite do cartão</BytebankText>
        <BytebankText variant="sm" fontWeight="bold">
          {formatLimitCurrency(card?.limit) ?? "R$ 0,00"}
        </BytebankText>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <BytebankText variant="sm">Data de expiração</BytebankText>
        <BytebankText variant="sm" fontWeight="bold">
          {formatExpirationDate(card?.expirationDate) || "0/00"}
        </BytebankText>
      </Box>
    </Box>
  );
};
