import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster';

import fetch from 'node-fetch';

let url = 'https://express.api.dhl.com/mydhlapi/pickups/';
const dhlorder = {
    method: 'DELETE',
    headers: {
        "content-type": 'application/json',
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

export async function deletepickup(req, res) {
    const token = generateToken(req.headers)
    const verify = jwt.verify(token, privatekey)
    if (verify) {
        if (req.body.dispatchConfirmationNumber) {

            url = `https://express.api.dhl.com/mydhlapi/test/pickups/${req.body.dispatchConfirmationNumber}?requestorName=${req.body.requestorName}&reason=${req.body.reason}`;
            console.log(url)

            console.log('Reason:', req.body.reason, 'Resquestor Name:', req.body.requestorName, 'Number:', req.body.dispatchConfirmationNumber)
            let detailCancelPickup = await cancelpickup(dhlorder)
            console.log(detailCancelPickup)
            res.send(detailCancelPickup)
        }
    }
}

function generateToken(payload) {
    return jwt.sign(payload, privatekey)
}

async function cancelpickup(order) {
    return fetch(url, order)
        .then(response => response.json())
        .then(response => { return response })
        .catch(err => console.error(err));
}