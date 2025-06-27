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
  variant?: "sm" | "md" | "lg" | "auto";
  alt?: string;
}
enum BytebankIllustrationVariant {
  "sm" = "60px",
  "md" = "160px",
  "lg" = "220px",
  "auto" = "fit-content",
}

export function BytebankIllustration({
  name,
  variant = "auto",
  alt,
}: BytebankIllustrationProps) {
  const path: string = name ? `/images/${name}.svg` : "";
  return (
    <Box
      sx={{
        width: BytebankIllustrationVariant[variant],
        height: variant === "auto" ? "fit-content" : null,
      }}
    >
      <img src={path} alt={alt} width={BytebankIllustrationVariant[variant]} />
    </Box>
  );
}
