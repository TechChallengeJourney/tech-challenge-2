import { Box } from "@mui/material";
import { BytebankCard } from "../card/card";
import { BytebankText } from "../text/text";

export interface CardWidgetProps {
  title: string;
  icon: React.ReactNode;
  value: string;
}

export function CardWidget({ title, icon, value }: CardWidgetProps) {
  return (
    <BytebankCard variant="outlined">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width={{ xs: "90vw", md: "20vw" }}
        height="100%"
        padding={2}
      >
        <Box display="flex" flexDirection="column">
          <BytebankText
            variant="xs"
            fontWeight={200}
            color="secondary"
            mb={0.5}
          >
            {title}
          </BytebankText>
          <BytebankText variant="md" fontWeight="bold">
            {value}
          </BytebankText>
        </Box>

        <Box
          width="40px"
          height="40px"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="20px"
        >
          {icon}
        </Box>
      </Box>
    </BytebankCard>
  );
}
