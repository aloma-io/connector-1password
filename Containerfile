FROM node:20-alpine3.20

ENV NODE_ENV production

WORKDIR /connector/

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
COPY ./entrypoint.sh ./
COPY ./src ./src
COPY ./logo.png ./logo.png
COPY ./.version ./.version

RUN set -e; npm --no-git-tag-version --allow-same-version version $(cat .version); 
RUN set -e; addgroup -g 1111 connector; adduser -S -u 1111 -G connector connector

RUN set -e; apk add --no-cache git python3 make g++; yarn config set --home enableTelemetry 0; chmod 755 /connector/entrypoint.sh; cd /connector/; yarn install --frozen-lockfile; yarn run build

USER connector

ENTRYPOINT ["/connector/entrypoint.sh"]