import { BytebankIllustration } from '@bytebank/shared';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function BytebankLoadingContent() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      margin="0 auto"
      px={2}
    >
      <BytebankIllustration name="card-saving" variant="lg" />
      <Typography variant="h6" mt={4}>
        Redirecionando para sua área...
      </Typography>
      <CircularProgress color="primary" sx={{ mt: 3 }} />
    </Box>
  );
}
