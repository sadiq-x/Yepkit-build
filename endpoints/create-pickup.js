import fetch from 'node-fetch';

import Auth from 'yepkit-authorization';
const keyName = 'user-srv-key';
const issuer = 'user-srv';
const audience = 'yepkit.com';
const auth = Auth(keyName, issuer, audience)

import client from 'yepkit-event-mdl';
const topic = process.env.TOPIC_CREATEPICKUP;

let url = 'https://express.api.dhl.com/mydhlapi/pickups';
const dhlorder = {
    method: 'POST',
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

export async function createpickup(req, res) {
    auth.init()
    if (auth.checkAuthorized(req, 'admin')) {
        dhlorder.body = JSON.stringify(req.body)
        if (dhlorder.body) {
            console.log('DHL Pickup:', dhlorder)
            let detailPickup = await pickup(dhlorder)
            res.send(detailPickup)
            console.log(detailPickup)
        }
    } else {
        res.send('Authorization denied')
    }
}

async function pickup(order) {
    return fetch(url, order)
        .then(response => response.json())
        .then(response => { return response })
        .catch(err => console.error(err));
}

//
async function consumer(data) {
    console.log(data);
    dhlorder.body = data
    let detailShip = await pickup({ dhlorder })
    console.log(detailShip)
}

async function consumerTopic() {
    client.consume(topic, consumer)
}

consumerTopic()