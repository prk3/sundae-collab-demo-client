FROM node:12
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=8200
ENV PUBLIC_URL=http://localhost:8200
ENV REACT_APP_API_URL=http://localhost:8000
ENV REACT_APP_COLLAB_URL=ws://localhost:8100

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE $PORT
CMD npx serve -s -p $PORT build



