# Project description
DHL order/delivery and pickup service.

# Dhl API
https://developer.dhl.com/api-reference/dhl-express-mydhl

# Url Dhl Express API
* https://express.api.dhl.com/mydhlapi -> Url currently used.
* https://express.api.dhl.com/mydhlapi/test -> Url for test.

# Type:
Module.

# Npm dependecies:
* express,nodemon,node-fetch,yepkit-authorization,yepkit-event-mdl;

# Configuration and Variable environment:
* PORT_SRV = Port that the service will listen to (Default value 0 and required),
* MESSAGE_REFERENCE = Please provide message reference (Default value 0 and required), 
* MESSAGE_REFERENCE_DATE = Optional reference date in the HTTP-date format (Default value 0 and required), 
* PLUGIN_NAME = Please provide name of the plugin (applicable to 3PV only) (Default value 0 and required), 
* PLUGIN_VERSION = Please provide version of the plugin (applicable to 3PV only) (Default value 0 and required), 
* SHIPPING_SYSTEM_PLATFORM_NAME = Please provide name of the shipping platform(applicable to 3PV only) (Default value 0 and required), 
* SHIPPING_SYSTEM_PLATFORM_VERSION = Please provide version of the shipping platform (applicable to 3PV only) (Default value 0 and required), 
* WEBSTORE_PLATFORM_NAME = Please provide name of the webstore platform (applicable to 3PV only) (Default value 0 and required), 
* WEBSTORE_PLATFORM_VERSION = Please provide version of the webstore platform (applicable to 3PV only) (Default value 0 and required), 
* AUTHORIZATION = Key to access Dhl Express API account (Default value 0 and required), 
* CLIENT_HOST = Connection host string, to event-server (Default value 0 and required), 
* CLIENT_PORT = Connection port string, to event-server (Default value 0 and required), 
* CLIENT_ID = Client ID string, for communication, to event-server (Default value 0 and required), 
* GROUP_ID = Group ID string, for communication, to event-server (Default value 0 and required), 
* TOPIC_CREATEORDER = Event-server, createorder topic string for events (Default value 0 and required), 
* TOPIC_CREATEPICKUP = Event-server, createpickup topic string for events (Default value 0 and required),
* KEY_MANAGER_HOST = Key host for authorization of jsonwebtoken (Default value 0 and required),
* KEY_MANAGER_PORT = Key Port for authorization of jsonwebtoken (Default value 0 and required);

# Endpoints:
### Available endpoints:
* '/createorder' => Create shipment,
* '/readorder' => Read a shipment created,
* '/createpickup' => Create pickup,
* '/deletpickup' => Delete pickup;

### Others endpoints:
* '/dhlfile' => Read file /dhl-body.json , use only for test,
* '/tests' => Use only for test;

# Endpoints description:
## '/createorder' : (POST request)
#### Request:
Authorization jsonwebtoken : Authorizationherader.
(Example)
'{
  "plannedShippingDateAndTime": "2019-08-04T14:00:31GMT+01:00",
  "pickup": {
    "isRequested": false,
    "closeTime": "18:00",
    "location": "reception",
    "specialInstructions": [
      {
        "value": "please ring door bell",
        "typeCode": "TBD"
      }
    ],
    "pickupDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "pickupRequestorDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    }
  },
  "productCode": "D",
  "localProductCode": "D",
  "getRateEstimates": false,
  "accounts": [
    {
      "typeCode": "shipper",
      "number": "123456789"
    }
  ],
  "valueAddedServices": [
    {
      "serviceCode": "II",
      "value": 100,
      "currency": "GBP",
      "method": "cash",
      "dangerousGoods": [
        {
          "contentId": "908",
          "dryIceTotalNetWeight": 12,
          "unCode": "UN-7843268473"
        }
      ]
    }
  ],
  "outputImageProperties": {
    "printerDPI": 300,
    "customerBarcodes": [
      {
        "content": "barcode content",
        "textBelowBarcode": "text below barcode",
        "symbologyCode": "93"
      }
    ],
    "customerLogos": [
      {
        "fileFormat": "PNG",
        "content": "base64 encoded image"
      }
    ],
    "encodingFormat": "pdf",
    "imageOptions": [
      {
        "typeCode": "label",
        "templateName": "ECOM26_84_001",
        "isRequested": true,
        "hideAccountNumber": false,
        "numberOfCopies": 1,
        "invoiceType": "commercial",
        "languageCode": "eng",
        "languageCountryCode": "br",
        "encodingFormat": "png",
        "renderDHLLogo": false,
        "fitLabelsToA4": false,
        "labelFreeText": "string",
        "labelCustomerDataText": "string"
      }
    ],
    "splitTransportAndWaybillDocLabels": true,
    "allDocumentsInOneImage": true,
    "splitDocumentsByPages": true,
    "splitInvoiceAndReceipt": true,
    "receiptAndLabelsInOneImage": true
  },
  "customerReferences": [
    {
      "value": "Customer reference",
      "typeCode": "CU"
    }
  ],
  "identifiers": [
    {
      "typeCode": "shipmentId",
      "value": "1234567890",
      "dataIdentifier": "00"
    }
  ],
  "customerDetails": {
    "shipperDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "receiverDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "buyerDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "buyer@domain.com",
        "phone": "+44123456789",
        "mobilePhone": "+42123456789",
        "companyName": "Customer Company Name",
        "fullName": "Mark Companer"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "importerDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "exporterDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "sellerDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    },
    "payerDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia",
        "provinceName": "Central Bohemia",
        "countryName": "Czech Republic"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      },
      "registrationNumbers": [
        {
          "typeCode": "VAT",
          "number": "CZ123456789",
          "issuerCountryCode": "CZ"
        }
      ],
      "bankDetails": [
        {
          "name": "Russian Bank Name",
          "settlementLocalCurrency": "RUB",
          "settlementForeignCurrency": "USD"
        }
      ],
      "typeCode": "business"
    }
  },
  "content": {
    "packages": [
      {
        "typeCode": "2BP",
        "weight": 22.5,
        "dimensions": {
          "length": 15,
          "width": 15,
          "height": 40
        },
        "customerReferences": [
          {
            "value": "Customer reference",
            "typeCode": "CU"
          }
        ],
        "identifiers": [
          {
            "typeCode": "shipmentId",
            "value": "1234567890",
            "dataIdentifier": "00"
          }
        ],
        "description": "Piece content description",
        "labelBarcodes": [
          {
            "position": "left",
            "symbologyCode": "93",
            "content": "string",
            "textBelowBarcode": "text below left barcode"
          }
        ],
        "labelText": [
          {
            "position": "left",
            "caption": "text caption",
            "value": "text value"
          }
        ],
        "labelDescription": "bespoke label description"
      }
    ],
    "isCustomsDeclarable": true,
    "declaredValue": 150,
    "declaredValueCurrency": "CZK",
    "exportDeclaration": {
      "lineItems": [
        {
          "number": 1,
          "description": "line item description",
          "price": 150,
          "quantity": {
            "value": 1,
            "unitOfMeasurement": "BOX"
          },
          "commodityCodes": [
            {
              "typeCode": "outbound",
              "value": "HS1234567890"
            }
          ],
          "exportReasonType": "permanent",
          "manufacturerCountry": "CZ",
          "exportControlClassificationNumber": "US123456789",
          "weight": {
            "netValue": 10,
            "grossValue": 10
          },
          "isTaxesPaid": true,
          "additionalInformation": [
            "string"
          ],
          "customerReferences": [
            {
              "typeCode": "AFE",
              "value": "custref123"
            }
          ],
          "customsDocuments": [
            {
              "typeCode": "972",
              "value": "custdoc456"
            }
          ]
        }
      ],
      "invoice": {
        "number": "12345-ABC",
        "date": "2020-03-18",
        "signatureName": "Brewer",
        "signatureTitle": "Mr.",
        "signatureImage": "Base64 encoded image",
        "instructions": [
          "string"
        ],
        "customerDataTextEntries": [
          "string"
        ],
        "totalNetWeight": 999999999999,
        "totalGrossWeight": 999999999999,
        "customerReferences": [
          {
            "typeCode": "CU",
            "value": "custref112"
          }
        ],
        "termsOfPayment": "100 days"
      },
      "remarks": [
        {
          "value": "declaration remark"
        }
      ],
      "additionalCharges": [
        {
          "value": 10,
          "caption": "fee",
          "typeCode": "freight"
        }
      ],
      "destinationPortName": "port details",
      "placeOfIncoterm": "port of departure or destination details",
      "payerVATNumber": "12345ED",
      "recipientReference": "recipient reference",
      "exporter": {
        "id": "123",
        "code": "EXPCZ"
      },
      "packageMarks": "marks",
      "declarationNotes": [
        {
          "value": "up to three declaration notes"
        }
      ],
      "exportReference": "export reference",
      "exportReason": "export reason",
      "exportReasonType": "permanent",
      "licenses": [
        {
          "typeCode": "export",
          "value": "license"
        }
      ],
      "shipmentType": "personal",
      "customsDocuments": [
        {
          "typeCode": "972",
          "value": "custdoc445"
        }
      ]
    },
    "description": "shipment description",
    "USFilingTypeValue": "12345",
    "incoterm": "DAP",
    "unitOfMeasurement": "metric"
  },
  "documentImages": [
    {
      "typeCode": "INV",
      "imageFormat": "PDF",
      "content": "base64 encoded image"
    }
  ],
  "onDemandDelivery": {
    "deliveryOption": "servicepoint",
    "location": "front door",
    "specialInstructions": "ringe twice",
    "gateCode": "1234",
    "whereToLeave": "concierge",
    "neighbourName": "Mr.Dan",
    "neighbourHouseNumber": "777",
    "authorizerName": "Newman",
    "servicePointId": "SPL123",
    "requestedDeliveryDate": "2020-04-20"
  },
  "requestOndemandDeliveryURL": false,
  "shipmentNotification": [
    {
      "typeCode": "email",
      "receiverId": "receiver@email.com",
      "languageCode": "eng",
      "languageCountryCode": "UK",
      "bespokeMessage": "message to be included in the notification"
    }
  ],
  "prepaidCharges": [
    {
      "typeCode": "freight",
      "currency": "CZK",
      "value": 200,
      "method": "cash"
    }
  ],
  "getTransliteratedResponse": false,
  "estimatedDeliveryDate": {
    "isRequested": false,
    "typeCode": "QDDC"
  },
  "getAdditionalInformation": [
    {
      "typeCode": "pickupDetails",
      "isRequested": true
    }
  ],
  "parentShipment": {
    "productCode": "s",
    "packagesCount": 1
  }
}'
####  Response:
* Code 201 - Shipment Created.
* Code 400 - Wrong input parameters.
* Code 422 - Wrong input parameters.
* Code 500 - Process errors.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.
-
## '/readorder' : (POST request)
#### Request:
Authorization jsonwebtoken : Authorizationherader.
(Example)
'{"shipmentTrackingNumber":"1234567890"}'
#### Response:
* Code 200 - Shipment details found.
* Code 400 - Wrong input parameters.
* Code 404 - No data found.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.
-
## '/createpickup' : (POST request)
#### Request:
Authorization jsonwebtoken : Authorizationherader.
(Example)
'{
  "plannedPickupDateAndTime": "2019-08-04T14:00:31GMT+01:00",
  "closeTime": "18:00",
  "location": "reception",
  "locationType": "residence",
  "accounts": [
    {
      "typeCode": "shipper",
      "number": "123456789"
    }
  ],
  "specialInstructions": [
    {
      "value": "please ring door bell",
      "typeCode": "TBD"
    }
  ],
  "remark": "string",
  "customerDetails": {
    "shipperDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      }
    },
    "receiverDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      }
    },
    "bookingRequestorDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      }
    },
    "pickupDetails": {
      "postalAddress": {
        "postalCode": "14800",
        "cityName": "Prague",
        "countryCode": "CZ",
        "provinceCode": "CZ",
        "addressLine1": "V Parku 2308/10",
        "addressLine2": "addres2",
        "addressLine3": "addres3",
        "countyName": "Central Bohemia"
      },
      "contactInformation": {
        "email": "that@before.de",
        "phone": "+1123456789",
        "mobilePhone": "+60112345678",
        "companyName": "Company Name",
        "fullName": "John Brew"
      }
    }
  },
  "shipmentDetails": [
    {
      "productCode": "string",
      "localProductCode": "str",
      "accounts": [
        {
          "typeCode": "shipper",
          "number": "123456789"
        }
      ],
      "valueAddedServices": [
        {
          "serviceCode": "II",
          "localServiceCode": "II",
          "value": 100,
          "currency": "GBP",
          "method": "cash"
        }
      ],
      "isCustomsDeclarable": true,
      "declaredValue": 150,
      "declaredValueCurrency": "CZK",
      "unitOfMeasurement": "metric",
      "shipmentTrackingNumber": "123456790",
      "packages": [
        {
          "typeCode": "3BX",
          "weight": 10.5,
          "dimensions": {
            "length": 25,
            "width": 35,
            "height": 15
          }
        }
      ]
    }
  ]
}'
#### Response:
* Code 201 - Pickup created.
* Code 400 - Wrong input parameters.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.
-
## '/deletpickup' : (DELETE request)
#### Request:
Authorization jsonwebtoken : Authorizationherader.
(Example)
'{"dispatchConfirmationNumber":"123","requestorName":"yepkit","reason":"example"}'
#### Response:
* Code 201 - Pickup cancelled.
* Code 400 - Pickup already cancelled or completed / Wrong input parameters.
* Code 404 - Pickup not found.
* If the error is invalid credentials, the error is located in the Dhl Express access data
api.
* If the error is token failed, the error is located in jsonwebtoken.

# Curl:
* '/createorder' -> [curl - here](./curl-dhl-createorder.txt),
* '/readorder' -> [curl - here](./curl-dhl-readorder.txt),
* '/createpickup' -> [curl - here](./curl-dhl-createpickup.txt),
* '/deletepickup' -> [curl - here](./curl-dhl-deletepickup.txt);

# System Administration:
* Start service:
```
$ npm start
```
or
```
$ node src/index.js
```
# project structure:
/ys2-dhlexpressapi
    /endpoints
     cancel-pickup.js
     create-order.js
     create-pickup.js
     read.order.js
     read-dhl-body.js
    /node_modules
    /src
     index.js
     /test
      Containerfile-test
      test.js
    Containerfile
    curl-dhl-createorder.txt
    curl-dhl-readorder.txt
    curl-dhl-cancelpickup.txt
    curl-dhl-creayepickup.txt
    dhl-body.json
    package-lock.json
    package.json
    README.md

# Podman/Docker build:
* [Podman build image - HERE](./Containerfile)
