import { Box, CardContent } from "@mui/material";
import { colorsPalette, useTheme } from "@repo/utils";
import { BankCardVariant, BankCardFunction } from "../../classes";
import { BytebankCard } from "../card/card";
import { BytebankText } from "../text/text";

import "./style.scss";

export interface BytebankCardBankProps {
  name: string;
  cardNumber: string;
  expirationDate?: string;
  functions?: BankCardFunction[];
  variant: BankCardVariant;
}

export function BytebankCardBank({
  name,
  cardNumber,
  variant,
}: BytebankCardBankProps) {
  const { isDarkMode } = useTheme();

  const palette = !isDarkMode ? colorsPalette.light : colorsPalette.dark;

  const variantColorMap: Record<string, string> = {
    platinum: palette["background.platinumCard"],
    gold: palette["background.goldcard"],
    black: palette["background.blackCard"],
  };

  const bgcolor = variantColorMap[variant] || palette["grey.400"];

  function maskCardNumber(cardNumber: string): string {
    const cardNumberStr = String(cardNumber);
    const lastFourDigits = cardNumberStr.slice(-4);
    const maskedCardNumber = "**** **** ****";

    return `${maskedCardNumber} ${lastFourDigits}`;
  }

  return (
    <Box
      className="card-bank--container"
      sx={{
        width: { xs: "100%", md: "639px" },
      }}
    >
      <BytebankCard
        bgcolor={bgcolor}
        variant="elevation"
        className="card-bank--container__card"
      >
        <Box padding={2} gap={2}>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <BytebankText
                variant="md"
                fontWeight={600}
                style={{ fontStyle: "italic" }}
              >
                Byte
              </BytebankText>
              <BytebankText variant="xs" fontWeight={400} marginBottom={2}>
                {variant}
              </BytebankText>

              <Box
                width={{ xs: "80%", sm: "60%", md: "40%" }}
                maxWidth={500}
                marginY={2}
              ></Box>

              <Box display="flex" flexDirection="column" marginTop={1}>
                <BytebankText variant="sm" fontWeight={100} marginBottom={4}>
                  {name}
                </BytebankText>
                <BytebankText variant="sm" fontWeight={200} marginTop={4}>
                  {maskCardNumber(cardNumber)}
                </BytebankText>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </BytebankCard>
    </Box>
  );
}
