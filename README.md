# Project:
Criar um serviço de analytics, recolha e intereção com os dados. 
O serviço recolhe os dados, guarda-os em JSON na base de dados mongodb.
O serviço pode apresentar os dados em ano/meses/dias em JSON.

# Type: 
Module.

# Npm dependencies:
Expressjs,
Mongodb,
Dotenv,
c8,
mocha,
jsonwebtoken.

# end-point:
/analystics     \\Get the analystics from request header from client \\.
/metrics/d      \\Show the analystic metrics for days\\.
        /y      \\Show the analystic metrics for year\\.
        /m      \\Show the analystic metrics for year and month\\.
/tests          \\Use for the test\\.

# Files:
analystic.js: Javascript file, is used to enter customer data.
analysticFindGet.js: Javascript file, use Get to look up data in DataBase.
analysticFindPost.js: Javascript file, use Post to look up data in DataBase.

# Variable environment:
export MONGO_DB='mongodb+srv://<username>:<password>@<cluster>.tpn4u.mongodb.net/?retryWrites=true&w=majority';
export PORT_SRV=5999;

# Curl tests:
 # User data test to input into the database:
  curl http://localhost:5999/analystic
 # Data collection test:
  curl -X POST http://localhost:5999/metrics -H 'Content-Type: application/json' -d '{"dayStart":"1","monthStart":"1","yearStart":"2022","dayEnd":"1","monthEnd":"11","yearEnd":"2022"}'
 # Not used (files analysticFindPost1 and analysticFindPost2):
  curl -X POST http://localhost:5999/metrics/d;
  curl -X POST http://localhost:5999/metrics/m -H 'Content-Type: application/json' -d '{"month":"","year":""}';
  curl -X POST http://localhost:5999/metrics/y -H 'Content-Type: application/json' -d '{"year":""}';

