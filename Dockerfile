FROM node:16-alpine3.11 as build
ENV NODE_ENV production

WORKDIR /game-web

COPY package*.json /game-web/
RUN npm install
COPY ./ /game-web/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# bundle asset for nginx
FROM nginx:1.16.0-alpine as production
ENV NODE_END production
COPY --from=build /game-web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 4200

# 執行nginx
CMD ["nginx", "-g", "daemon off;"]
