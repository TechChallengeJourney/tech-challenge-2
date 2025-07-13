import React from "react";
import { Box } from "@mui/material";
import { BytebankText } from "@repo/ui";
import { CreditCard } from "@mui/icons-material";

export const CardHeader: React.FC<{ variant: string }> = ({ variant }) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent={{ xs: "center", md: "flex-start" }}
    alignItems="center"
    gap="10px"
    mb={4}
  >
    <CreditCard fontSize="large" />
    <BytebankText variant="md" fontWeight="bold">
      Byte {variant}
    </BytebankText>
  </Box>
);