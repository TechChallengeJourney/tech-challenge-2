import { JSX } from '@emotion/react/jsx-runtime';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from "@repo/utils";

interface BytebankLinearProgressProps {
  value?: number;
  height?: number;
  variant?: 'primary' | 'secondary'; // ← sua variante customizada
}

export function BytebankLinearProgress({
  value,
  height = 14,
  variant = 'primary', // ← padrão
  ...rest
}: BytebankLinearProgressProps): JSX.Element {

  const { colors } = useTheme();

  const barColor =
    variant === 'secondary' ? colors['lime.900'] : colors['lime.500'];

  const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height,
    borderRadius: 9999,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: colors['grey.200'],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 9999,
      backgroundColor: barColor,
      ...theme.applyStyles('dark', {
        backgroundColor: barColor, // você pode mudar se quiser cor diferente no dark
      }),
    },
  }));

  return (
    <StyledLinearProgress
      variant="determinate"
      value={value}
      {...rest}
    />
  );
}
