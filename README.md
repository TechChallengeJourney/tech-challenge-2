# Bytebank - Tech Challenge #2

Bem-vindo ao projeto de estudo **Bytebank**, uma aplicação moderna desenvolvida em **React**. Para garantir uma estrutura flexível, escalável e organizada, o projeto foi criado utilizando o **Turborepo** (https://turborepo.com/docs). Essa abordagem facilita o compartilhamento de componentes e a gestão de diferentes features, possibilitando uma integração eficiente de múltiplos frameworks.

---

## 🚀 Começando

Estas instruções vão te ajudar a rodar o projeto localmente e explorar as funcionalidades que implementamos neste projeto, que são elas:

- Possibilidade de criar um novo usuário e logar na aplicação com **autenticação**;
- Criar, editar e excluir uma transação registrada;
- Filtrar o extrato;
- Visualizar o saldo total;
- Visualizar e customizar widgets;
- Editar perfil do usuário;
- Visualizar e excluir cartões vinculados a sua conta;
- Acessar o nosso blog.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

---

## 🛠️ Instalação

Clone este repositório:

```bash
git clone https://github.com/TechChallengeJourney/tech-challenge-2.git
cd tech-challenge-2
```

Instale todas as dependências:

```bash
yarn install
```

## 🚀 Como Executar

### Rodar o projeto

Execute o comando abaixo para iniciar o servidor de desenvolvimento:

```bash
yarn run dev
```

Acesse http://localhost:3000 no seu navegador para visualizar o projeto.

## Rodar a API

Para iniciar a API, é necessário clonar nosso outro repositório do [Bytebank API](https://github.com/TechChallengeJourney/bytebank-api) e rodar os comandos:

```bash
docker-compose build
docker-compose up
```

## 🎨 Estilização

Para visualizar o Design System do projeto, utilizamos o Storybook para exibir e demonstrar as definições de layout e componentes, foi baseado neste Figma (https://www.figma.com/design/ZeXkGB9NhAr5ypgpgF1gWf/Bytebank---Redesign?node-id=118-103&t=hyMOJlYGyckL9kYm-1). E para conferir a documentação dos componenentes do nosso Design System, utilize os comandos:

```bash
cd apps/docs
yarn run storybook
```

## 🎨 Acessibilidade

[![Assista no YouTube](https://img.youtube.com/vi/25bLFFlW_PM/hqdefault.jpg)](https://youtu.be/25bLFFlW_PM)

## Links Úteis

- [React](https://react.dev/reference/react)
- [Material MUI](https://mui.com/material-ui/all-components/)
- [Module Federation](https://module-federation.io/practice/frameworks/react/index.html)
- [Rsbuild](https://rsbuild.rs)
- [Storybook](https://storybook.js.org/docs)
- [TurboRepo](https://turborepo.com/docs)
- [Astro](https://docs.astro.build/en/basics/astro-components)
