// Arquivo de configuração do single-spa para orquestração dos micro frontends
// Este arquivo NÃO deve ser usado diretamente no navegador!
// Use apenas como fonte para build/transpilar ou referência.
// O arquivo correto para o browser é public/single-spa-config.js (script puro, sem import/export).
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'mfe-react',
  app: () => {
    console.log('Tentando importar mfe-react via SystemJS...');
    return System.import('mfe-react').catch(err => {
      console.error('Erro ao importar mfe-react:', err);
      throw err;
    });
  },
  activeWhen: ['/'], // Ativa o React na home
});

start();
console.log('single-spa iniciado');
