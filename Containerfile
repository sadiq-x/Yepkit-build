FROM docker.io/node:slim

WORKDIR /yepkitanalytics
COPY . .
RUN npm install

EXPOSE 5999
ENV MONGO_DB 0
ENV PORT_SRV 0

CMD [ "node", "src/index.js" ]
