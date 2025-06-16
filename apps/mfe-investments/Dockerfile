# Dockerfile para aplicação React (MFE-Investments)
FROM node:20-alpine
WORKDIR /app

# Copiar apenas o diretório necessário do monorepo
COPY packages/ui /app/packages/ui
COPY apps/mfe-investments/package*.json ./
COPY apps/mfe-investments .

# Remover a referência ao pacote local do arquivo package.json
RUN sed -i 's/"@repo\/ui": "file:..\/..\/packages\/ui"/"@repo\/ui": "\/app\/packages\/ui"/g' package.json

RUN yarn install
RUN yarn add typescript --dev
RUN yarn run build

EXPOSE 3001
CMD ["yarn", "run", "dev"]
