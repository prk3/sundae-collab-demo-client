ENV NODE_ENV=production
ENV PORT=8200
ENV PUBLIC_URL=http://localhost:8200
ENV REACT_APP_API_URL=http://localhost:8000
ENV REACT_APP_COLLAB_URL=ws://localhost:8100

FROM node:12
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

EXPOSE $PORT
CMD npm run build && npx serve -s -p $PORT build

COPY . .

