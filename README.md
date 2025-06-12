# React Micro Frontend com Module Federation

Este projeto demonstra o uso de Module Federation no Webpack 5 para criar micro frontends em React.

## Estrutura do Projeto

- `/container` - Aplicação principal (container) que monta os micro frontends
- `/remote` - Uma aplicação remota que é carregada pelo container

## Requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Instalação

1. Instale as dependências do container:

```bash
cd container
npm install
```

2. Instale as dependências do remote:

```bash
cd ../remote
npm install
```

## Rodando o Projeto

1. Inicie a aplicação remote:

```bash
cd remote
npm start
```

2. Em outro terminal, inicie a aplicação container:

```bash
cd container
npm start
```

3. Acesse a aplicação container em [http://localhost:3000](http://localhost:3000)

## Como Funciona

- O container é executado na porta 3000
- O remote é executado na porta 3001
- O container importa o componente App do remote usando Module Federation
- O remote expõe seu componente App para ser consumido pelo container

## Características

- Compartilhamento de dependências para evitar duplicação (React, React DOM, React Router)
- Carregamento dinâmico de módulos remotos
- Roteamento integrado entre o container e os micro frontends
