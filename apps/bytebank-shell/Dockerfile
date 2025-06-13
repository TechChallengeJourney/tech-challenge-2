# Dockerfile para aplicação React (Vite)
FROM node:20-alpine
WORKDIR /src
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build
RUN yarn install -g serve
EXPOSE 5173
CMD ["serve", "dist", "-l", "3000"]
