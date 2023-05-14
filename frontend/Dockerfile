FROM node:19-alpine3.17

WORKDIR /app

COPY package.json .

# RUN npm install
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del .gyp


COPY . .

RUN adduser \
    --disabled-password \
    # --no-create-home \
    react-user

USER react-user
