const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const BytebankExtract = require('./dist/components/extract/extract').default;

const app = express();
const PORT = 3002; // Alterado para evitar conflitos

// Middleware para simular dados dinâmicos
app.get('/extract', (req, res) => {
  console.log('Request received at /extract');

  try {
    // Simular dados do servidor
    const data = { message: 'Server-side data for Bytebank Extract' };

    // Renderizar o componente com os dados
    const componentHTML = renderToString(
      React.createElement(BytebankExtract, { data })
    );

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bytebank Extract</title>
        </head>
        <body>
          <div id="root">${componentHTML}</div>
          <script>
            // Passar os dados para o cliente para hidratação
            window.__INITIAL_DATA__ = ${JSON.stringify(data)};
          </script>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error rendering /extract:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Log para verificar se o servidor está escutando corretamente
app.listen(PORT, () => {
  console.log(`SSR server is running on http://localhost:${PORT}`);
  if (app._router && app._router.stack) {
    console.log('Available routes:');
    console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));
  } else {
    console.log('No routes available or router stack is undefined.');
  }
});
