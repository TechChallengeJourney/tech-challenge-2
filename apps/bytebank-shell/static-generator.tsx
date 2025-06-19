import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './src/App';
import { BytebankWrapper } from './src/components/wrapper/wrapper';

// Importação específica para a página de exemplo SSG
import SSGPage from './src/pages/ssg/ssg-page';

// Lista de rotas para pré-renderizar estaticamente
const routes = ['/', '/dashboard', '/ssr-exemplo', '/ssg-exemplo'];

// Dados para o exemplo de SSG
const staticBuildData = {
  buildTimestamp: new Date().toISOString(),
  buildInfo: 'Gerado estaticamente durante o build (SSG)',
};

// Função para renderizar uma página
const renderPage = (route: string) => {
  // Renderização especial para a página de exemplo SSG
  if (route === '/ssg-exemplo') {
    const ssgHtml = renderToString(
      <StaticRouter location={route}>
        <BytebankWrapper>
          <SSGPage staticData={staticBuildData} />
        </BytebankWrapper>
      </StaticRouter>
    );
    return ssgHtml;
  }
  
  // Renderização padrão para outras páginas
  const appHtml = renderToString(
    <StaticRouter location={route}>
      <BytebankWrapper>
        <App />
      </BytebankWrapper>
    </StaticRouter>
  );

  return appHtml;
};

// Função para gerar páginas estáticas
const generateStaticPages = async () => {
  console.log('Iniciando geração de páginas estáticas (SSG)...');

  // Criar diretório para páginas estáticas
  const outDir = path.resolve(__dirname, 'dist/static');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Ler o template HTML
  const indexFile = path.resolve(__dirname, 'dist/index.html');
  const template = fs.readFileSync(indexFile, 'utf8');

  // Gerar cada página
  for (const route of routes) {
    console.log(`Gerando página estática para: ${route}`);
    const appHtml = renderPage(route);

    // Inserir o HTML renderizado no template
    const html = template.replace(
      '<div id="root"></div>', 
      `<div id="root">${appHtml}</div>`
    );

    // Determinar o caminho de saída
    let routePath = route === '/' ? 'index' : route.replace(/^\//, '');
    const outPath = path.join(outDir, `${routePath}.html`);
    
    // Garantir que o diretório existe
    const outPathDir = path.dirname(outPath);
    if (!fs.existsSync(outPathDir)) {
      fs.mkdirSync(outPathDir, { recursive: true });
    }

    // Escrever o arquivo HTML
    fs.writeFileSync(outPath, html);
  }

  console.log('✅ Geração de páginas estáticas concluída!');
};

// Executar geração de páginas estáticas
generateStaticPages().catch(err => {
  console.error('Erro ao gerar páginas estáticas:', err);
  process.exit(1);
});
