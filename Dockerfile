FROM node:16-alpine3.11 as build
ENV NODE_ENV production

WORKDIR /game-web

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn install --production

# Copy app files
COPY . .

# build
ENV PATH="./node_modules/.bin:$PATH" 
RUN yarn run build -- --configuration production
# RUN node_modules/.bin/ng build --configuration production

# bundle asset for nginx
FROM nginx:1.16.0-alpine as production
ENV NODE_END production
COPY --from=build /game-web/dist/video-games-db /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 4200

# 執行nginx
CMD ["nginx", "-g", "daemon off;"]
