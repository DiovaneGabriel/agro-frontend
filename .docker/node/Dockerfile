FROM node:21.7.1-alpine

# Instala o bash
RUN apk add --no-cache bash && \
    npm install -g npm@10.5.0 && \
    npm install -g create-next-app

# Define o diretório de trabalho
WORKDIR /app

# Expõe a porta 3000
EXPOSE 3000

# Comando padrão para iniciar o container
CMD ["node", "index.js"]