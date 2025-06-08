// Arquivo de configuração do single-spa para orquestração dos micro frontends
// Corrigido para rodar como script puro no navegador
console.log('[single-spa-config] Script carregado');
System.import('single-spa').then(({ registerApplication, start }) => {
  console.log('[single-spa-config] SystemJS disponível:', typeof window.System !== 'undefined');
  registerApplication({
    name: 'mfe-react',
    app: () => {
      console.log('[single-spa-config] Tentando importar mfe-react via SystemJS...');
      return System.import('mfe-react').catch(err => {
        console.error('[single-spa-config] Erro ao importar mfe-react:', err);
        throw err;
      });
    },
    activeWhen: ['/'],
  });
  start();
  console.log('[single-spa-config] single-spa iniciado');
});
