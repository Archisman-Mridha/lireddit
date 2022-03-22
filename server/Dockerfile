FROM node:17-alpine

ENV PORT=4000

WORKDIR /app

COPY ./dist/package.json .
RUN yarn

COPY .env .env

COPY ./dist/main.js .

EXPOSE 4000

CMD ["node", "main.js"]