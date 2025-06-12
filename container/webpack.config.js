const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/bootstrap',
  mode: 'development',  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },  plugins: [
    new ModuleFederationPlugin({
      name: 'container',      remotes: {
        remote: `promise new Promise((resolve, reject) => {
          const remoteUrl = 'http://localhost:3001/remoteEntry.js';
          const script = document.createElement('script');
          script.src = remoteUrl;
          script.onload = () => {
            // O script foi carregado com sucesso
            const proxy = {
              get: (request) => window.remote.get(request),
              init: (arg) => {
                try {
                  return window.remote.init(arg);
                } catch(e) {
                  console.log('Error initializing remote', e);
                }
              }
            }
            resolve(proxy);
          }
          script.onerror = (error) => {
            console.error('Erro ao carregar o remote:', error);
            reject(new Error('Não foi possível carregar o remote app'));
          }
          document.head.appendChild(script);
        })`,
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react-router-dom': { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
