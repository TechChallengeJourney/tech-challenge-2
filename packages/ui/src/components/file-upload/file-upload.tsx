import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useTheme } from "@repo/utils";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export function BytebankInputFileUpload() {
  const { colors } = useTheme();

  return (
    <Button
      component="label"
      role={'asdasd'}
      variant="outlined"
      sx={{
          fontSize:'1rem',
          color: colors["grey.500"],
          fontWeight:600,
          border:'dotted 2px rgba(0,0,0,0.1)',
          width:"100%",
          "&:hover": {
            // border:'dotted 2px colors["lime.800"]',
            color: colors["lime.700"],
            bgcolor: colors["lime.100"], // cor de fundo no hover
            cursor: "pointer", // opcional: mostra que é clicável
          },
        }}
      tabIndex={-1}
      startIcon={<PublishRoundedIcon />}
    >
      FAZER UPLOAD DE ARQUIVO
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
      />
    </Button>
  );
}