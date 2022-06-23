import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster';

import fetch from 'node-fetch';

import client from 'yepkit-event-mdl';
const topic = process.env.TOPIC_CREATEORDER;

const url = 'https://express.api.dhl.com/mydhlapi/shipments';
const dhlorder = {
    method: 'POST',
    headers: {
        "content-type": 'application/json',
        "Message-Reference": process.env.MESSAGE_REFERENCE,
        "Message-Reference-Date": process.env.MESSAGE_REFERENCE_DATE,
        "Plugin-Name": process.env.PLUGIN_NAME,
        "Plugin-Version": process.env.PLUGIN_VERSION,
        "Shipping-System-Platform-Name": process.env.SHIPPING_SYSTEM_PLATFORM_NAME,
        "Shipping-System-Platform-Version": process.env.SHIPPING_SYSTEM_PLATFORM_VERSION,
        "Webstore-Platform-Name": process.env.WEBSTORE_PLATFORM_NAME,
        "Webstore-Platform-Version": process.env.WEBSTORE_PLATFORM_VERSION,
        "Authorization": process.env.AUTHORIZATION
    }
};

export async function createorder(req, res) {
    const token = generateToken(req.headers)
    const verify = jwt.verify(token, privatekey)
    if (verify) {
        dhlorder.body = JSON.stringify(req.body)
        if (dhlorder.body) {
            console.log('DHL Order:', dhlorder)
            let detailShip = await shipping(dhlorder)
            console.log(detailShip)
            res.send(detailShip)
        }
    }
}

function generateToken(payload) {
    return jwt.sign(payload, privatekey)
}

async function shipping(order) {
    return fetch(url, order)
        .then(response => response.json())
        .then(response => { return response })
        .catch(err => console.error(err));
}

//
async function consumer(data) {
    console.log(data);
    dhlorder.body = data
    let detailShip = await shipping({ dhlorder })
    console.log(detailShip)
}

async function consumerTopic() {
    client.consume(topic, consumer)
}

consumerTopic()