# Project description
DHL order/delivery and pickup service.

# Dhl API
https://developer.dhl.com/api-reference/dhl-express-mydhl

# Url Dhl Express API
https://express.api.dhl.com/mydhlapi -> Url to work.
https://express.api.dhl.com/mydhlapi/test -> Url test.

# Type:
Module.

# Npm dependecies:
express,jsonwebtoken,nodemon,node-fetch;

# Npm test dependecies:
c8,mocha;

# Endpoints:
'/createorder' => Create shipment.
'/readorder' => Read a shipment created.
'/createpickup' => Create pickup.
'/deletpickup' => Delete pickup.

'/dhlfile' => Read file /dhl-body.json , use only for develop.
'/tests' => Use only for test.

# Variable environment:
PORT_SRV;(The environment variables by default are set to 0.)

# Variable environment at files create-order.js/read-order.js/create-pickup.js/cancel-pickup.js:
MESSAGE_REFERENCE, MESSAGE_REFERENCE_DATE, PLUGIN_NAME, PLUGIN_VERSION, SHIPPING_SYSTEM_PLATFORM_NAME, SHIPPING_SYSTEM_PLATFORM_VERSION, WEBSTORE_PLATFORM_NAME, WEBSTORE_PLATFORM_VERSION, AUTHORIZATION;(The environment variables by default are set to 0.)


# Curl :
'/createorder' -> /curl-dhl-createorder.txt,
'/readorder' -> /curl-dhl-readorder.txt,
'/createpickup' -> /curl-dhl-createpickup.txt,
'/deletepickup' -> /curl-dhl-deletepickup.txt;

# npm start

Others:
npm run nodemon
---------------