# Project:
DHL order and delivery service, with CRUD.
# Type:
Module.
# Npm dependencies:
Express, Mongodb, Dotenv, jsonwebtoken.
# Test npm dependencies:
c8, mocha.
# Endpoints:
-
# Files:
-
# Curl test:
-

# Mongo DB, URI example:
mongodb+srv://<username>:<password>@<cluster>.tpn4u.mongodb.net/?retryWrites=true&w=majority

# Variable environment:
MONGO_DB,
PORT_SRV;

# Variable environment at file create-order.js:
MESSAGE_REFERENCE,
MESSAGE_REFERENCE_DATE,
PLUGIN_NAME,
PLUGIN_VERSION,
SHIPPING_SYSTEM_PLATFORM_NAME,
SHIPPING_SYSTEM_PLATFORM_VERSION,
WEBSTORE_PLATFORM_NAME,
WEBSTORE_PLATFORM_VERSION,
AUTHORIZATION;

# Containerfile
Variable environment:
MONGO_DB, PORT_SRV;
(The environment variables by default are set to 0.)

# $ npm start

# Curl developer test:
curl -X POST http://localhost:5999/createorder -H 'Content-Type: application/json' -d '{"user":"Rafael","company":"Yepkit"}'