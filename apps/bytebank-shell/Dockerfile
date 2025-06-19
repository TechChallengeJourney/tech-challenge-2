# Dockerfile para aplicação React (Bytebank-Shell)
FROM node:20-alpine
WORKDIR /app
COPY packages/ui /app/packages/ui
COPY apps/bytebank-shell/package*.json ./
COPY apps/bytebank-shell .

# Remover a referência ao pacote local do arquivo package.json
RUN sed -i 's/"@repo\/ui": "file:..\/..\/packages\/ui"/"@repo\/ui": "\/app\/packages\/ui"/g' package.json

RUN yarn install
RUN yarn add typescript --dev
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "run", "dev"]
