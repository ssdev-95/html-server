# syntax=docker/dockerfile:1
FROM node:16.14.2
COPY ["package.json", "yarn.lock", "tsconfig.json", "src", "_temp", "./"]
RUN yarn
RUN yarn build
ENV NODE_ENV=production