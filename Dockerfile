FROM node:16-alpine3.11 as build
ENV NODE_ENV production

WORKDIR /game-web

# Cache and Install dependencies
COPY package.json .
COPY node_modules/.bin .
COPY yarn.lock .

RUN yarn install --production 

# Copy app files
COPY . /game-web
RUN echo $(ls -al /game-web/node_modules)
# COPY ./node_modules/.bin /game-web/node_modules/

# build
RUN yarn run build:prod
# RUN ./node_modules/.bin/ng build --configuration production

# WORKDIR /app
# COPY package*.json /app/
# RUN npm install
# COPY ./ /app/
# ARG configuration=production
# RUN npm run build -- --output-path=./dist/out --configuration $configuration

# bundle asset for nginx
FROM nginx:1.16.0-alpine as production
ENV NODE_END production
COPY --from=build /app/dist/out /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 4200

# 執行nginx
CMD ["nginx", "-g", "daemon off;"]
