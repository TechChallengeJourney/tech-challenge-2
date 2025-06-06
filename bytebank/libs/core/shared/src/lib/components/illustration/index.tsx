import { Box } from "@mui/material";

export interface BytebankIllustrationProps {
  /**
   * O nome da ilustração
   */
  name: string;
  /**
   * O tamanho da ilustração
   * @type 'sm' | 'md' |'lg' | 'auto'
   * @default md
   */
  variant?: 'sm' | 'md' |'lg' | 'auto';
  className?: string;
}
enum BytebankIllustrationVariant {
  'sm' = '60px',
  'md' = '160px',
  'lg' = '220px',
  'auto' = 'fit-content',
  'className' = ''
}
export function BytebankIllustration({name, variant = 'auto', className}: BytebankIllustrationProps) {
  const path: string = name ? `/images/${name}.png` : '';
  return (
    <Box className={className} sx={{width: BytebankIllustrationVariant[variant], height: variant === 'auto' ? 'fit-content' : null}}>
      <img src={path} alt='' width={BytebankIllustrationVariant[variant]} />
    </Box>
  );
}