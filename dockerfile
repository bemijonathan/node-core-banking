FROM node:alpine3.12

COPY . .

RUN npm i

EXPOSE 4000

CMD ["npm", "run", "start"]