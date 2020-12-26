FROM node:12
WORKDIR /usr/src/app

USER root

COPY . .

RUN npm install -g ts-node nodemon typescript
RUN npm install

EXPOSE 9097

CMD ["npm", "run", "start:dev"]