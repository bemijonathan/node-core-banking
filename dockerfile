FROM node:alpine3.12

WORKDIR /app

COPY ./package.json .

RUN npm i

RUN npm i -g nodemon

COPY . .

EXPOSE 4000

CMD [ "npm" , "run", "start:dev" ]


# credict the card if the person passes the eligibility