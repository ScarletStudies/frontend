# thanks to https://medium.com/@tiangolo/angular-in-docker-with-nginx-supporting-environments-built-with-multi-stage-docker-builds-bb9f1724e984

# Stage 0, based on Node.js, to build and compile Angular
FROM node:10 as node

WORKDIR /app

COPY package.json /app/

# thanks to https://github.com/npm/npm/issues/17346
RUN npm config set unsafe-perm true
RUN npm install

COPY ./ /app/

RUN npm run build:prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13

COPY --from=node /app/dist/scarlet-studies-frontend /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
