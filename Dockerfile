FROM node:12
WORKDIR /usr/src/app

ENV PORT=8200

ARG PUBLIC_URL=http://localhost:8200
ARG REACT_APP_API_URL=http://localhost:8000
ARG REACT_APP_COLLAB_URL=ws://localhost:8100

COPY package.json .
COPY package-lock.json .
RUN NODE_ENV=production npm install

COPY . .
RUN NODE_ENV=production npm run build

EXPOSE $PORT
CMD NODE_ENV=production npx serve -s -p $PORT build
