# define node version
FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

COPY ./.env ./

RUN npm install

COPY . .

EXPOSE 3000