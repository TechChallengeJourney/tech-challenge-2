# Dockerfile para aplicação React (mfe-transactions)
FROM node:20.16.0-alpine
WORKDIR /app
COPY apps/mfe-transactions /app/apps/mfe-transactions
COPY packages/data-access /app/packages/data-access
COPY packages/eslint-config /app/packages/eslint-config
COPY packages/typescript-config /app/packages/typescript-config
COPY packages/ui /app/packages/ui
COPY packages/utils /app/packages/utils
COPY package*.json .
COPY turbo.json .
COPY yarn.lock .

RUN yarn install
RUN yarn run build
EXPOSE 3002
CMD ["yarn", "run", "dev"]
