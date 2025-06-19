import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

// Componente exemplo que utiliza SSR
interface SSRExampleCardProps {
  serverData: {
    timestamp: string;
    serverInfo: string;
  };
}

// Na renderização do servidor, este componente será pré-renderizado com dados do servidor
const SSRExampleCard: React.FC<SSRExampleCardProps> = ({ serverData }) => {
  const [clientTimestamp, setClientTimestamp] = React.useState<string | null>(null);
  
  // Este useEffect só será executado no cliente, não durante o SSR
  React.useEffect(() => {
    // Atualiza com dados do cliente após a hidratação
    setClientTimestamp(new Date().toISOString());
  }, []);
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        my: 3, 
        maxWidth: '800px',
        mx: 'auto',
        borderLeft: '5px solid #2196f3' 
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#2196f3' }}>
        Exemplo de Server-Side Rendering (SSR)
      </Typography>
      
      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Timestamp da renderização no servidor:</strong> {serverData.timestamp}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Informação do servidor:</strong> {serverData.serverInfo}
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Timestamp da hidratação no cliente:</strong>{' '}
          {clientTimestamp || 'Aguardando hidratação...'}
        </Typography>
      </Box>
      
      <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
        Este componente foi renderizado inicialmente no servidor (SSR) e depois hidratado no cliente.
        Compare os timestamps para ver a diferença entre renderização no servidor e hidratação no cliente.
      </Typography>
    </Paper>
  );
};

export default SSRExampleCard;
