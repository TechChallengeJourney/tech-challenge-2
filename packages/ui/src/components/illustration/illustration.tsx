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
  type?: "svg" | "png" | "gif";
  width?: string;
  height?: string;
  alt?: string;
}

const BytebankIllustrationSizes = {
  sm: 60,
  md: 160,
  lg: 220,
};

export function BytebankIllustration({
  name,
  variant = "auto",
  type = "svg",
  alt,
  width,
  height,
}: BytebankIllustrationProps) {
  const path = name ? `/images/${name}.${type}` : "";

  const fixedWidth = BytebankIllustrationSizes[variant as keyof typeof BytebankIllustrationSizes];

  return (
    <Box
      sx={{
        width: variant === "auto" ? "100%" : fixedWidth,
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={path}
        alt={alt}
        style={{
          width: width ? width : (variant === "auto" ? "100%" : fixedWidth),
          height: height ? height : "auto",
          maxWidth: "100%",
        }}
      />
    </Box>
  );
}
