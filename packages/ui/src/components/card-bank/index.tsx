import { Box, CardContent } from "@mui/material";
import { colorsPalette, useTheme } from "@repo/utils";
import { BankCardVariant } from "../../classes";
import { BytebankCard } from "../card/card";
import { BytebankText } from "../text/text";

import "./style.scss";

export interface BytebankCardBankProps {
  variant: BankCardVariant;
  details: BytebankCardBankDetails;
}

export interface BytebankCardBankDetails {
  name: string;
  cardNumber: string;
  expirationDate: string;
}

export function BytebankCardBank({
  variant = "Físico",
  details,
}: BytebankCardBankProps) {
  const { isDarkMode } = useTheme();
  const palette = !isDarkMode ? colorsPalette.light : colorsPalette.dark;
  const bgcolor: string | undefined =
    variant === "Físico" ? palette["background.bankcard"] : palette["grey.400"];

  return (
    <Box className="card-bank--container">
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
                Platinum
              </BytebankText>

              <Box
                width={{ xs: "80%", sm: "60%", md: "40%" }}
                maxWidth={500}
                marginY={2}
              ></Box>

              <Box display="flex" flexDirection="column" marginTop={1}>
                <BytebankText variant="sm" fontWeight={200} marginBottom={4}>
                  {details.name}
                </BytebankText>
                <BytebankText variant="sm" fontWeight={200}  marginTop={4}>
                  **** **** **** {details.cardNumber.slice(-4)}
                </BytebankText>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </BytebankCard>
    </Box>
  );
}
