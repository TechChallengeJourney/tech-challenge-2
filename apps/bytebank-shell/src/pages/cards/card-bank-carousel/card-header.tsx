import React from "react";
import { Box } from "@mui/material";
import { BytebankText } from "@repo/ui";
import { CreditCard } from "@mui/icons-material";

export const CardHeader: React.FC<{ variant: string }> = ({ variant }) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent={{ xs: "flex-start", md: "flex-start" }}
    alignItems="center"
    gap="10px"
    mb={{xs: 2, sm: 2, md:4}}
  >
    <CreditCard fontSize="large" />
    <BytebankText variant="md" fontWeight="bold">
      Byte {variant}
    </BytebankText>
  </Box>
);