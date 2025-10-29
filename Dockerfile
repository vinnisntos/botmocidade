# Use Node.js 22 como base
FROM node:22-bullseye

# Instale dependências do Chromium para Puppeteer/whatsapp-web.js
RUN apt-get update && \
    apt-get install -y wget gnupg2 ca-certificates \
    fonts-liberation libnss3 lsb-release xdg-utils \
    libatk-bridge2.0-0 libgtk-3-0 libxss1 libgconf-2-4 \
    libasound2 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxrandr2 libxfixes3 libxrender1 libxext6 libglib2.0-0 \
    libgbm1 libpango1.0-0 libcups2 libatk1.0-0 libpangocairo-1.0-0 \
    libatspi2.0-0 libxinerama1 libdrm2 libepoxy0 chromium && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Pasta do app
WORKDIR /app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale dependências
RUN npm install

# Copie todo o restante do projeto
COPY . .

# Aponta o caminho do Chromium no container
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Comando pra rodar o bot
CMD ["node", "index.js"]
