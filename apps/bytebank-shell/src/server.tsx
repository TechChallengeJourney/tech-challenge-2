import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { BytebankWrapper } from './components/wrapper/wrapper';

// Importamos os componentes diretamente
import SSRPage from './pages/ssr/ssr-page';
import SSGPage from './pages/ssg/ssg-page';

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.resolve(__dirname, '../dist')));

// Função para buscar dados dinâmicos do servidor
const getDadosDinamicos = () => {
  return {
    timestamp: new Date().toISOString(),
    serverInfo: 'Node.js + Express + React SSR (Dados reais do servidor)',
    serverUptime: process.uptime() + ' segundos',
    nodeVersion: process.version
  };
};

// Função para renderizar SSR com App completo
const renderApp = (req: express.Request) => {
  const appHtml = renderToString(
    <StaticRouter location={req.url}>
      <BytebankWrapper>
        <App />
      </BytebankWrapper>
    </StaticRouter>
  );

  return appHtml;
};

// Função para renderizar componente SSR com dados específicos
const renderSSRExample = (dadosServidor: any) => {
  const ssrHtml = renderToString(
    <StaticRouter location="/ssr-exemplo">
      <BytebankWrapper>
        <SSRPage serverData={dadosServidor} />
      </BytebankWrapper>
    </StaticRouter>
  );

  return ssrHtml;
};

// Função para renderizar componente SSG com dados específicos
// No ambiente de desenvolvimento, isso simula como seria a página pré-renderizada
const renderSSGExample = () => {
  // Dados estáticos que seriam gerados durante o build
  const dadosEstaticos = {
    buildTimestamp: new Date().toISOString(),
    buildInfo: 'Simulação de SSG (ambiente de desenvolvimento)'
  };
  
  const ssgHtml = renderToString(
    <StaticRouter location="/ssg-exemplo">
      <BytebankWrapper>
        <SSGPage staticData={dadosEstaticos} />
      </BytebankWrapper>
    </StaticRouter>
  );

  return ssgHtml;
};

// Rota específica para a página de exemplo SSR
app.get('/ssr-exemplo', (req, res) => {
  // Leitura do template HTML
  const indexFile = path.resolve(__dirname, '../dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler arquivo HTML:', err);
      return res.status(500).send('Erro ao carregar a página');
    }

    // Obter dados dinâmicos do servidor
    const dadosServidor = getDadosDinamicos();

    // Renderização do componente SSR com dados dinâmicos
    const ssrHtml = renderSSRExample(dadosServidor);

    // Inserir o HTML renderizado no template
    const html = data.replace('<div id="root"></div>', `<div id="root">${ssrHtml}</div>`);

    // Injetar os dados para hidratação do cliente
    const htmlComDados = html.replace(
      '</body>',
      `<script>window.__INITIAL_SSR_DATA__ = ${JSON.stringify(dadosServidor)};</script></body>`
    );

    // Enviar o HTML completo para o cliente
    return res.send(htmlComDados);  });
});

// Rota específica para a página de exemplo SSG
app.get('/ssg-exemplo', (req, res) => {
  // Nota: Em produção, essa página seria servida como HTML estático.
  // Esta rota só existe para simular o comportamento em desenvolvimento.
  
  // Leitura do template HTML
  const indexFile = path.resolve(__dirname, '../dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler arquivo HTML:', err);
      return res.status(500).send('Erro ao carregar a página');
    }

    // Renderização do componente SSG
    const ssgHtml = renderSSGExample();

    // Inserir o HTML renderizado no template
    const html = data.replace('<div id="root"></div>', `<div id="root">${ssgHtml}</div>`);

    // Não precisamos injetar dados dinâmicos, pois em SSG os dados estáticos já foram renderizados
    // Em produção, esta página seria simplesmente um arquivo HTML estático servido pelo servidor web

    // Adicionar comentário no HTML para identificação
    const htmlComMensagem = html.replace(
      '</head>',
      '<meta name="render-type" content="ssg-simulation" /><!-- Esta página simula SSG em desenvolvimento --></head>'
    );

    // Enviar o HTML completo para o cliente
    return res.send(htmlComMensagem);
  });
});

// Rota catch-all para as demais páginas
app.get('*', (req, res) => {
  // Leitura do template HTML
  const indexFile = path.resolve(__dirname, '../dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler arquivo HTML:', err);
      return res.status(500).send('Erro ao carregar a página');
    }

    // Renderização do app React
    const appHtml = renderApp(req);

    // Inserir o HTML renderizado no template
    const html = data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Enviar o HTML completo para o cliente
    return res.send(html);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor SSR rodando na porta ${PORT}`);
});
