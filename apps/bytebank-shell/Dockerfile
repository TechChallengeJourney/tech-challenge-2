# Dockerfile para aplicação React (Bytebank-Shell)
FROM node:20.16.0-alpine
WORKDIR /app
COPY apps/bytebank-shell /app/apps/bytebank-shell
COPY packages/data-access /app/packages/data-access
COPY packages/eslint-config /app/packages/eslint-config
COPY packages/typescript-config /app/packages/typescript-config
COPY packages/ui /app/packages/ui
COPY packages/utils /app/packages/utils
COPY package*.json .
COPY turbo.json .
COPY yarn.lock .

RUN yarn install
WORKDIR /app/apps/bytebank-shell
RUN yarn build
EXPOSE 3000
CMD ["yarn", "dev"]
