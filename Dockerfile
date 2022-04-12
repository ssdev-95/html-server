# Configs to docker
# syntax=docker/dockerfile:1
FROM node:16.x.x
RUN npm i -g yarn @1.22.18
COPY ["package.json", "yarn.lock*", "tsconfig.json", "src", "_temp", "./"]
RUN yarn
RUN yarn build
ENV NODE_ENV=production
