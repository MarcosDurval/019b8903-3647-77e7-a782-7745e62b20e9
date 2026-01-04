ARG NODE_VERSION=22.21.1
ARG ALPINE_VERSION=alpine3.23

FROM node:${NODE_VERSION}-${ALPINE_VERSION} AS base

RUN mkdir -p /app && \
    chown -R node:node /app

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

ENTRYPOINT ["node", "index.js"]