FROM node:17-alpine

WORKDIR /app

COPY ./dist/package.json .
RUN yarn

COPY ./dist .

EXPOSE 4000

CMD ["node", "main.js"]