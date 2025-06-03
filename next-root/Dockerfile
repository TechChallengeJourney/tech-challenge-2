# Dockerfile para aplicação Next.js (root)
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm cache clean --force
COPY . .
# Depuração: listar node_modules/tailwindcss antes do build
RUN ls -la node_modules/tailwindcss && npm ls tailwindcss || (echo 'tailwindcss NÃO encontrado!' && ls -la node_modules)
RUN npm run build
RUN rm -rf node_modules .next/cache && npm install --omit=dev --legacy-peer-deps && npm cache clean --force
EXPOSE 3000
CMD ["npm", "start"]
