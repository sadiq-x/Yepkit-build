# TO DO!!!!!!!!


# Curl createStock:
curl -X POST http://localhost:5999/insertstock -H 'Content-Type: application/json' -d '{"user":"sadiqV1","stockItem":{"type":"Product","name":"Ykush","quantity":"10","reference":"02-P"}}'
curl -X POST http://localhost:5999/insertstock -H 'Content-Type: application/json' -d '{"user":"sadiqV1","stockItem":{"type":"Product","name":"Ykush3","quantity":"100","reference":"03-P"}}'
curl -X POST http://localhost:5999/insertstock -H 'Content-Type: application/json' -d '{"user":"sadiqV1","stockItem":{"type":"Product","name":"YkushXs","quantity":"45","reference":"Xs-P"}}'

'{"user":"","stockItem":{"type":"","name":"","quantity":"","reference":""}}'

//Example with request completed
'{"user":"sadiq","stockItem":{"type":"product","name":"Ykush3","quantity":"10","reference":"0003"}}'


# Curl readStock:
id: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"id":"62c45a28013269222807fc46"}}'

name: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"name":""}}'

type: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"type":"Product"}}'

reference: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"reference":""}}'

all: curl -X POST http://localhost:5999/readstock -H 'Content-Type: application/json' -d '{"search":{"all":""}}'

# Curl deletestock:
id: curl -X DELETE http://localhost:5999/deletestock -H 'Content-Type: application/json' -d '{"delete":{"id":"62c457e55bf19163ac6a4aed"}}'

name: curl -X DELETE http://localhost:5999/deletestock -H 'Content-Type: application/json' -d '{"delete":{"name":""}}'

reference: curl -X DELETE http://localhost:5999/deletestock -H 'Content-Type: application/json' -d '{"delete":{"reference":""}}'

# Curl updateStock:


curl -X PUT http://localhost:5999/updatestock -H 'Content-Type: application/json' -d '{"id":"62c457e55bf19163ac6a4aed","user":"SadiqV2","stockItem":{"type":"Product","name":"Ykush3","quantity":"100","reference":"03-Y"}}'