FROM node:16-alpine3.11 as build
ENV NODE_ENV production

# Create and define the node_modules's cache directory.
RUN mkdir /cache
WORKDIR /cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
# COPY package-lock.json ./
COPY yarn.lock .
RUN yarn install

WORKDIR /game-web

# Cache and Install dependencies
# COPY package.json .
# COPY yarn.lock .

# RUN yarn install --production 

# Copy app files
COPY . .
COPY /cache .
RUN echo $(ls -al ./)
# COPY ./node_modules/.bin /game-web/node_modules/

# build
RUN yarn run build -- --configuration production
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
