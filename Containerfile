FROM docker.io/node:slim

WORKDIR /yepkitstockitem
COPY . .
RUN npm install

EXPOSE 5999
ENV PORT_SRV 0
ENV MONGO_DB 0


CMD [ "node", "src/index.js" ]