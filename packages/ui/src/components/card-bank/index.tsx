import { Box, CardContent } from "@mui/material";
import { colorsPalette, useTheme } from "@repo/utils";
import { BankCardVariant } from "../../classes";
import { BytebankCard } from "../card/card";
import { BytebankIllustration } from "../illustration/illustration";
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
        className={`card-bank--container__card`}
      >
        <>
          <Box padding={2} gap={2} color="#FFF">
            <CardContent>
              <Box display="flex" flexDirection={"column"}>
                <BytebankIllustration name="platinum" variant="auto" />
                <Box display="flex" flexDirection={"column"} marginTop={4}>
                  <BytebankText variant="sm" fontWeight={500} paddingBottom={1}>
                    **** **** **** {details.cardNumber.slice(-4)}
                  </BytebankText>
                  <BytebankText variant="sm" fontWeight={200}>
                    {details.name}
                  </BytebankText>
                  <BytebankText variant="sm" fontWeight={200}>
                    {details.expirationDate}
                  </BytebankText>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </>
      </BytebankCard>
    </Box>
  );
}
