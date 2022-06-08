# Project:
Criar um serviço de analytics, recolha e intereção com os dados. 
O serviço recolhe os dados, guarda-os em JSON na base de dados mongodb.
O serviço pode apresentar os dados de x data a x data, ou todos.

# Type: 
Module.

# Npm dependencies:
Express,
Mongodb,
Dotenv,
jsonwebtoken.

# Test npm  dependencies:
c8,
mocha.

# end-point:
/analytics      \\Get the analytics from request header from client \\.
/metrics        \\Show the data user\\.

/tests          \\Use for the test\\.

# Files:
index.js: Javascript file, is used to enter customer data.
analytics-find-post.js: Javascript file, use Post to look up data in DataBase.

# Variable environment:
export MONGO_DB='mongodb+srv://<username>:<password>@<cluster>.tpn4u.mongodb.net/?retryWrites=true&w=majority';
export PORT_SRV=5999;

# Curl tests:
 ## User data test to input into the database:
  curl http://localhost:5999/analytic
 ## Data collection test:
  curl -X POST http://localhost:5999/metrics -H 'Content-Type: application/json' -d '{"dayStart":"1","monthStart":"1","yearStart":"2022","dayEnd":"1","monthEnd":"11","yearEnd":"2022"}'
  or
  curl -X POST http://localhost:5999/metrics
 ## Not used (files analysticFindPost1 and analysticFindPost2):
  curl -X POST http://localhost:5999/metrics/d;
  curl -X POST http://localhost:5999/metrics/m -H 'Content-Type: application/json' -d '{"month":"","year":""}';
  curl -X POST http://localhost:5999/metrics/y -H 'Content-Type: application/json' -d '{"year":""}';

# Containerfile 
Variable environment:

MONGO_DB,
PORT_SRV;

The environment variables by default are set to 0.
------------------------------------------------------
$ npm start

