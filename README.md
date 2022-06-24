# Project description
DHL order/delivery and pickup service.

# Dhl API
https://developer.dhl.com/api-reference/dhl-express-mydhl

# Url Dhl Express API
* https://express.api.dhl.com/mydhlapi -> Url to work.
* https://express.api.dhl.com/mydhlapi/test -> Url test.

# Type:
Module.

# Npm dependecies:
* express,nodemon,node-fetch,yepkit-authorization,yepkit-event-mdl;

# Endpoints:
## '/createorder' => Create shipment:
* Code 201 - Shipment Created.
* Code 400 - Wrong input parameters.
* Code 422 - Wrong input parameters.
* Code 500 - Process errors.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.
## '/readorder' => Read a shipment created:
* Code 200 - Shipment details found.
* Code 400 - Wrong input parameters.
* Code 404 - No data found.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.
## '/createpickup' => Create pickup:
* Code 201 - Pickup created.
* Code 400 - Wrong input parameters.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.
## '/deletpickup' => Delete pickup:
* Code 201 - Pickup cancelled.
* Code 400 - Pickup already cancelled or completed / Wrong input parameters.
* Code 404 - Pickup not found.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.

# Other endpoints:
* '/dhlfile' => Read file /dhl-body.json , use only for develop.
* '/tests' => Use only for test.

# Topics:
"dhl-createorder", "dhl-createpickup";

# Variable environment:
PORT_SRV, MESSAGE_REFERENCE, MESSAGE_REFERENCE_DATE, PLUGIN_NAME, PLUGIN_VERSION, SHIPPING_SYSTEM_PLATFORM_NAME, SHIPPING_SYSTEM_PLATFORM_VERSION, WEBSTORE_PLATFORM_NAME, WEBSTORE_PLATFORM_VERSION, AUTHORIZATION, CLIENT_HOST, CLIENT_PORT, CLIENT_ID, GROUP_ID, TOPIC_CREATEORDER, TOPIC_CREATEPICKUP,KEY_MANAGER_HOST,KEY_MANAGER_PORT;
(The environment variables by default are set to 0.)

# Curl :
* '/createorder' -> [curl](./curl-dhl-createorder.txt),
* '/readorder' -> [curl](./curl-dhl-readorder.txt),
* '/createpickup' -> [curl](./curl-dhl-createpickup.txt),
* '/deletepickup' -> [curl](./curl-dhl-deletepickup.txt);

```
$ npm start
```

