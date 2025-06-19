import React from 'react';
import { Typography, Paper, Box, Alert } from '@mui/material';

// Componente exemplo que utiliza SSG
interface SSGExampleCardProps {
  staticData: {
    buildTimestamp: string;
    buildInfo: string;
  };
}

// Na geração estática, este componente será pré-renderizado com dados do momento da build
const SSGExampleCard: React.FC<SSGExampleCardProps> = ({ staticData }) => {
  const [clientTimestamp, setClientTimestamp] = React.useState<string | null>(null);
  
  // Este useEffect só será executado no cliente, não durante o SSG
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
        borderLeft: '5px solid #4caf50' 
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#4caf50' }}>
        Exemplo de Static Site Generation (SSG)
      </Typography>
      
      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Timestamp da geração estática (build):</strong> {staticData.buildTimestamp}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Informação do build:</strong> {staticData.buildInfo}
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Timestamp atual do cliente:</strong>{' '}
          {clientTimestamp || 'Aguardando hidratação...'}
        </Typography>

        {clientTimestamp && (
          <Alert severity="info" sx={{ mt: 2 }}>
            A diferença entre os timestamps demonstra que esta página foi gerada estaticamente durante o build,
            não durante a requisição. O conteúdo estático foi gerado há{' '}
            {Math.round((new Date(clientTimestamp).getTime() - new Date(staticData.buildTimestamp).getTime()) / (1000 * 60))}{' '}
            minutos atrás.
          </Alert>
        )}
      </Box>
      
      <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
        Este componente foi gerado estaticamente durante o build (SSG) e depois hidratado no cliente.
        O conteúdo estático não muda entre as requisições, apenas durante um novo build.
      </Typography>
    </Paper>
  );
};

export default SSGExampleCard;
