FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

RUN npm install

COPY . .

RUN npm run build -- --filter=mfe-transactions

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/mfe-transactions/dist /app/dist

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-p", "3002"]

EXPOSE 3002
