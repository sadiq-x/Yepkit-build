# Project description
Inventory service of stocks of products, components, hubs.

# Type:
Module.

# Npm dependecies:
* express,mongodb,nodemon,yepkit-authorization;

# Configuration and Variable environment:
* PORT_SRV = Port that the service will listen to (Default value 0 and required),
* MONGO_DB = URI acess (Default value 0 and required).

# Endpoints:
### Available endpoints:
* '/insertstock' => Create stock inventory,
* '/readstock' => Read stock inventory,
* '/deletestock' => Delete stock inventory,
* '/updatestock' => Update stock inventory;

### Others endpoints:
* '/tests' => Use only for test;

# Endpoints description:
## '/insertstock' : (POST request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* Body:
```
'{"stockItem":{"type":"","name":"","quantity":"","reference":""}}'
```
####  Response:
* Code 200 - Create stock, show id of stock created.
* Code 400 - Wrong parameters.
* Code 401 - invalid credentials or acess, the error is located on mongodb URI or token failed, the error is located in jsonwebtoken.

## '/readstock' : (POST request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* Body:
```
'{"id": '{"search":{"id":""}}' -> This data body is for read stock in id search;

'{"name": '{"search":{"name":""}}' -> This data body is for read stock in name search;

'{"reference": '{"search":{"reference":""}}' -> This data body is for read stock in reference search;

'{"all": '{"search":{"all":""}}' -> This data body is for read all stock;
```
#### Response:
* Code 200 - Show data searched.
* Code 400 - Wrong parameters.
* Code 401 - invalid credentials or acess, the error is located on mongodb URI or token failed, the error is located in jsonwebtoken.

## '/deletestock' : (DELETE request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* Body:
```
'{"id": '{"delete":{"id":""}}' -> This data body is for delete stock by id;

'{"name": '{"delete":{"name":""}}' -> This data body is for delete stock by name;

'{"reference": '{"delete":{"reference":""}}' -> This data body is for delete stock by reference;
```
#### Response:
* Code 200 - Delete stock ok, if deleted  show was true.
* Code 400 - Wrong parameters.
* Code 401 - invalid credentials or acess, the error is located on mongodb URI or token failed, the error is located in jsonwebtoken.

## '/updatestock' : (PUT request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* Body:
```
'{"id":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}'
```
#### Response:
* Code 200 - Update stock ok, if updated show was true.
* Code 400 - Wrong parameters.
* Code 401 - invalid credentials or acess, the error is located on mongodb URI or token failed, the error is located in jsonwebtoken.

# Curl (example):
(Request using module 'yepkit-authorization', need token)

## '/insertstock' -> 

- Curl example to insert stock:
- curl -X POST http://localhost:PORT_SRV/insertstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"stockItem":{"type":"","name":"","quantity":"","reference":""}}',


## '/readstock' -> 

- Curl example to read stock for id search:
- id: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"id":""}}'

- Curl example to read stock for name search:
- name: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"name":""}}'

- Curl example to read stock for reference search:
- reference: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"reference":""}}'

- Curl example to\ read all stock:
- all: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"all":""}}',


## '/deletestock' -> 

- Curl example for delete stock by id:
- id: curl -X DELETE http://localhost:PORT_SRV/deletestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"delete":{"id":""}}'

- Curl example for delete stock by name:
- name: curl -X DELETE http://localhost:PORT_SRV/deletestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"delete":{"name":""}}'

- Curl example for delete stock by reference:
- reference: curl -X DELETE http://localhost:PORT_SRV/deletestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"delete":{"reference":""}}',


## '/updatestock' -> 

- Curl example for update stock:
- curl -X PUT http://localhost:PORT_SRV/updatestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"id":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}';


# System Administration:
* Start service:
```
$ npm start
```
or
```
$ node src/index.js
```

# Podman/Docker build:
* [Build image - HERE](./Containerfile)
