import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import SSGExampleCard from '../../components/ssg-example/SSGExampleCard';
import { Link } from 'react-router-dom';

// Interface para os dados estáticos
interface StaticData {
  buildTimestamp: string;
  buildInfo: string;
}

interface SSGPageProps {
  staticData?: StaticData;
}

// Dados padrão simulados do build quando não recebemos props
const defaultStaticData: StaticData = {
  buildTimestamp: new Date().toISOString(),
  buildInfo: 'Simulação de SSG (em desenvolvimento - dados padrão)'
};

const SSGPage: React.FC<SSGPageProps> = ({ staticData = defaultStaticData }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Página com Exemplo de SSG
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Esta página demonstra como funciona o Static Site Generation com React
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
            to="/ssr-exemplo"
            variant="outlined"
            color="secondary"
            sx={{ mr: 2 }}
          >
            Ver exemplo SSR
          </Button>
        </Box>
      </Box>
      
      <SSGExampleCard staticData={staticData} />
      
      <Box sx={{ mt: 6, p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Como o SSG funciona?
        </Typography>
        <Typography variant="body1" paragraph>
          1. Durante o processo de build, as páginas são renderizadas para HTML
        </Typography>
        <Typography variant="body1" paragraph>
          2. Os arquivos HTML estáticos são gerados e armazenados no servidor
        </Typography>
        <Typography variant="body1" paragraph>
          3. Quando o usuário solicita a página, o servidor entrega o HTML pré-renderizado
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
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Server-Side Rendering (SSR)
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

export default SSGPage;
