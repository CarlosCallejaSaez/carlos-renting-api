
FROM node:14


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY .env ./


COPY . .


EXPOSE 5000


CMD ["npm", "start"]
