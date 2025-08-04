import { Box } from "@mui/material";

export interface BytebankIllustrationProps {
  /**
   * O nome da ilustração
   */
  name?: string;
  /**
   * O tamanho da ilustração
   * @type 'sm' | 'md' |'lg' | 'auto'
   * @default md
   */
  variant?: "sm" | "md" | "lg" | "auto" | "fixed";
  type?: "svg" | "png" | "gif";
  width?: string;
  height?: string;
  alt?: string;
  justifyContent?: string;
  src?: string;
  className?: string;
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
  justifyContent = "center",
  src,
  className
}: BytebankIllustrationProps) {
  const path = name ? `/images/${name}.${type}` : "";

  const fixedWidth = BytebankIllustrationSizes[variant as keyof typeof BytebankIllustrationSizes];

  return (
    <Box
      className={className}
      sx={{
        width: variant === "auto" ? "100%" : fixedWidth ?? width,
        height: variant === "fixed" ? height : height ?? (variant === "auto" ? "100%" : height),
        maxWidth: "100%",
        display: "flex",
        justifyContent,
      }}
    >
      <img
        src={name ? path : src}
        alt={alt}
        style={{
          minWidth: variant === "auto" ? "100%" : fixedWidth,
          maxWidth: width ? width : (variant === "auto" ? "100%" : fixedWidth),
          maxHeight: height ? height : "auto",
        }}
      />
    </Box>
  );
}
