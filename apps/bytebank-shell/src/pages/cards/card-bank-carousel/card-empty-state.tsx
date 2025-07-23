import { Box } from "@mui/material";
import { BytebankIllustration, BytebankText } from "@repo/ui";

interface CardEmptyStateProps {
  text: string;
}

export const CardEmptyState: React.FC<CardEmptyStateProps> = ({text}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      gap={2}
      py={4}
      height="350px"
    >
      <BytebankIllustration
        name={"empty"}
        variant={"lg"}
      ></BytebankIllustration>
      <BytebankText variant="sm" color="textSecondary">
        {text}
      </BytebankText>
    </Box>
  );
};
