FROM node:14.15.4 AS base

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set always-auth false
RUN npm install --force

RUN mkdir /usr/src/app/src
COPY ./src /usr/src/app/src
COPY angular.json /usr/src/app
COPY tsconfig.json /usr/src/app
COPY tsconfig.app.json /usr/src/app

RUN npm run build:prod

EXPOSE 80
EXPOSE 443
EXPOSE 4200


FROM nginx:1.21.0 AS host
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist/WotDashLab .
COPY ./hosting/development/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./hosting/development/proxy.conf /etc/nginx/conf.d/includes
