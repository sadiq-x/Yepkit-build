import fetch from 'node-fetch';

import Auth from 'yepkit-authorization';
const keyName = 'user-srv-key';
const issuer = 'user-srv';
const audience = 'yepkit.com';
const auth = Auth(keyName, issuer, audience)

let url = 'https://express.api.dhl.com/mydhlapi/shipments/';
const dhlorder = {
    method: 'GET',
    headers: {
        "Message-Reference": process.env.MESSAGE_REFERENCE,
        "Message-Reference-Date": process.env.MESSAGE_REFERENCE_DATE,
        "Accept-Language": 'Content-Type: application/json',
        "Plugin-Name": process.env.PLUGIN_NAME,
        "Plugin-Version": process.env.PLUGIN_VERSION,
        "Shipping-System-Platform-Name": process.env.SHIPPING_SYSTEM_PLATFORM_NAME,
        "Shipping-System-Platform-Version": process.env.SHIPPING_SYSTEM_PLATFORM_VERSION,
        "Webstore-Platform-Name": process.env.WEBSTORE_PLATFORM_NAME,
        "Webstore-Platform-Version": process.env.WEBSTORE_PLATFORM_VERSION,
        "Authorization": process.env.AUTHORIZATION
    }
};

export async function readorder(req, res) {
    auth.init()
    if (auth.checkAuthorized(req, 'admin')) {
        if (req.body.shipmentTrackingNumber) {

            url = `https://express.api.dhl.com/mydhlapi/test/shipments/${req.body.shipmentTrackingNumber}/tracking`;
            //url = `https://express.api.dhl.com/mydhlapi/test/shipments/${req.body.shipmentTrackingNumber}/tracking?trackingView=${req.body.trackingView}-checkpoints&levelOfDetail=${req.body.levelOfDetail}`;
            console.log(url)

            console.log({ numberShipTraking: req.body.shipmentTrackingNumber })
            let detailTraking = await tracking(dhlorder)
            console.log(detailTraking)
            res.send(detailTraking)
        }
    } else {
        res.send('Authorization denied')
    }
}

async function tracking(order) {
    return fetch(url, order)
        .then(response => response.json())
        .then(response => { return response })
        .catch(err => console.error(err));
}