FROM node:alpine3.12

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]