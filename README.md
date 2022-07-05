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
'{"user":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}'
```
####  Response:
* Code 200 - .
* Code 400 - .
* If the error is invalid credentials or acess, the error is located on mongodb URI.
* If the error is token failed, the error is located in jsonwebtoken.

## '/readstock' : (POST request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* Body:
```
id: '{"search":{"id":""}}'

name: '{"search":{"name":""}}'

type: '{"search":{"type":""}}'

reference: '{"search":{"reference":""}}'

all: '{"search":{"all":""}}'
```
#### Response:
* Code 200 - .
* Code 400 - .
* If the error is invalid credentials or acess, the error is located on mongodb URI.
* If the error is token failed, the error is located in jsonwebtoken.

## '/deletestock' : (DELETE request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* Body:
```
id: '{"delete":{"id":""}}'

name: '{"delete":{"name":""}}'

reference: '{"delete":{"reference":""}}'
```
#### Response:
* Code 200 - .
* Code 400 - .
* If the error is invalid credentials or acess, the error is located on mongodb URI.
* If the error is token failed, the error is located in jsonwebtoken.

## '/updatestock' : (PUT request)
#### Request:
* Content-Type: application/json.
* Authorization jsonwebtoken : Authorizationheader.
* (Example):
```
'{"id":"","user":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}'
```
#### Response:
* Code 200 - .
* Code 400 - .
* If the error is invalid credentials or acess, the error is located on mongodb URI.
* If the error is token failed, the error is located in jsonwebtoken.

# Curl:
* '/insertstock' -> 
- curl -X POST http://localhost:PORT_SRV/insertstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"user":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}',
* '/readstock' -> 
- id: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"id":""}}'

- name: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"name":""}}'

- type: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"type":""}}'

- reference: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"reference":""}}'

- all: curl -X POST http://localhost:PORT_SRV/readstock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"search":{"all":""}}',
* '/deletestock' -> 
- id: curl -X DELETE http://localhost:PORT_SRV/deletestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"delete":{"id":""}}'

- name: curl -X DELETE http://localhost:PORT_SRV/deletestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"delete":{"name":""}}'

- reference: curl -X DELETE http://localhost:PORT_SRV/deletestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"delete":{"reference":""}}',
* '/updatestock' -> 
- curl -X PUT http://localhost:PORT_SRV/updatestock -H 'Content-Type: application/json' -H "Authorization: Bearer {token}" -d '{"id":"","user":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}';

# System Administration:
* Start service:
```
$ npm start
```
or
```
$ node src/index.js
```
# Project structure:
```

```

# Podman/Docker build:
* [Build image - HERE]()
