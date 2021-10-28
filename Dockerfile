FROM node:16-alpine3.11 as build
ENV NODE_ENV production

WORKDIR /game-web

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn install --production
RUN yarn global add react-scripts@3.0.1

# Copy app files
COPY . .

# build
# RUN yarn run build
RUN node_modules/.bin/ng build --prod

# bundle asset for nginx
FROM nginx:1.16.0-alpine as production
ENV NODE_END production
COPY --from=build /game-web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 4200

# 執行nginx
CMD ["nginx", "-g", "daemon off;"]
