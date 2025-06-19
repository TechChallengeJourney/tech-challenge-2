import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import SSRExampleCard from '../../components/ssr-example/SSRExampleCard';
import { Link } from 'react-router-dom';

// Interface para os dados do servidor
interface ServerData {
  timestamp: string;
  serverInfo: string;
  serverUptime?: string;
  nodeVersion?: string;
}

interface SSRPageProps {
  serverData?: ServerData;
}

// Dados padrão simulados do servidor quando não recebemos props
const defaultServerData: ServerData = {
  timestamp: new Date().toISOString(),
  serverInfo: 'Simulação de SSR (em desenvolvimento - dados padrão)'
};

const SSRPage: React.FC<SSRPageProps> = ({ serverData = defaultServerData }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Página com Exemplo de SSR
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Esta página demonstra como funciona o Server-Side Rendering com React
        </Typography>
          <Box sx={{ mt: 2, mb: 4 }}>
          <Button 
            component={Link}
            to="/"
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            Voltar à Home
          </Button>
          <Button
            component={Link}
            to="/ssg-exemplo"
            variant="outlined"
            color="success"
            sx={{ mr: 2 }}
          >
            Ver exemplo SSG
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            variant="outlined"
            color="secondary"
          >
            Dashboard
          </Button>
        </Box>
      </Box>
      
      <SSRExampleCard serverData={serverData} />
        <Box sx={{ mt: 6, p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Como o SSR funciona?
        </Typography>
        <Typography variant="body1" paragraph>
          1. O servidor Node.js recebe a solicitação da página
        </Typography>
        <Typography variant="body1" paragraph>
          2. Os componentes React são renderizados para HTML no servidor
        </Typography>
        <Typography variant="body1" paragraph>
          3. O HTML é enviado ao navegador, permitindo que o usuário veja o conteúdo imediatamente
        </Typography>
        <Typography variant="body1">
          4. O JavaScript é carregado e o React "hidrata" a página, tornando-a interativa
        </Typography>
      </Box>
      
      <Box sx={{ mt: 4, bgcolor: '#fffbf0', p: 3, borderLeft: '5px solid #ff9800', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          SSR vs SSG - Qual a diferença?
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6} sx={{ borderRight: { md: '1px solid #e0e0e0' } }}>
            <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
              Server-Side Rendering (SSR) ⟵ Você está aqui
            </Typography>
            <Typography variant="body2" paragraph>
              • Renderizado a <strong>cada requisição</strong> do usuário
            </Typography>
            <Typography variant="body2" paragraph>
              • Sempre possui <strong>dados atualizados</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              • Maior carga no servidor
            </Typography>
            <Typography variant="body2" paragraph>
              • Ideal para <strong>conteúdo dinâmico</strong> e personalizado
            </Typography>
            <Typography variant="body2">
              • Exemplo: Perfil de usuário, dashboards em tempo real
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Static Site Generation (SSG)
            </Typography>
            <Typography variant="body2" paragraph>
              • Renderizado <strong>apenas durante o build</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              • Dados podem estar <strong>desatualizados</strong> até o próximo build
            </Typography>
            <Typography variant="body2" paragraph>
              • Menor carga no servidor
            </Typography>
            <Typography variant="body2" paragraph>
              • Ideal para <strong>conteúdo estático</strong> que muda raramente
            </Typography>
            <Typography variant="body2">
              • Exemplo: Páginas de documentação, blog posts, landing pages
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SSRPage;
