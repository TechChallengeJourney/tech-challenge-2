// Importa dinamicamente o index com tratamento de erro
import('./index')
  .catch((error) => {
    console.error('Erro ao inicializar a aplicação remote:', error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = '<div style="color: red; padding: 20px;">Erro ao carregar a aplicação remote. Por favor, verifique o console para mais detalhes.</div>';
    }
  });
