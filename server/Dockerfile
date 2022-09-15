FROM node:12.13-alpine

RUN  mkdir -m 755 /home/node/application
COPY . /home/node/application

WORKDIR /home/node/application
RUN rm -rf node_modules
RUN npm install

ENTRYPOINT npm run start:dev