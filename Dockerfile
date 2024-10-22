FROM node:20.13.1
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "./src/server.js"]

