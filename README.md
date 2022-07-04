# TO DO!!!!!!!!


# Curl createStock:
'{"user":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}'

//Example with request completed
'{"user":"sadiq","stockItem":{"type":"product","name":"Ykush","quantity":"1","reference":"0001"}}'


# Curl readStock:
id: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"id":"62c2bbacaa2619ef05da9e51"}}'

name: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"name":""}}'

type: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"type":""}}'

reference: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"reference":""}}'

all: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"all":""}}'