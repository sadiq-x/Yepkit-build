import client from 'yepkit-event-mdl';

import express from 'express';
const app = express();

app.use(express.json());
//app.use(express.urlencoded());

//Server Port (environment variable).
const PORT = process.env.PORT_SRV || 9555

//Service state, after event-srv is started
let state;

//Configuration to connect with event-srv.
const clientConfig = {
    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT,
    clientid: process.env.CLIENT_ID,
    groupid: process.env.GROUP_ID
}

//Function main.
async function main() {
    state = await eventSrv()
    if (state) {
        server()
    }
}

//Function to start server.
function server() {
    app.listen(PORT, () => { console.log(`Sever connection stable (${PORT})`, PORT ? true : false) })
}

//Function to connect with event-srv
async function eventSrv() {
    return client.connect(clientConfig.host, clientConfig.port, clientConfig.clientid, clientConfig.groupid).then((result) => {
        console.log(result, true)
        return true
    }).catch((error) => {
        console.log(error)
    })
}

import { createorder } from '../endpoints/create-order.js';
app.post('/createorder', createorder, () => {
})

import { readorder } from '../endpoints/read-order.js';
app.post('/readorder', readorder, () => {
})

import { createpickup } from '../endpoints/create-pickup.js';
app.post('/createpickup', createpickup, () => {
})

import { deletepickup } from '../endpoints/cancel-pickup.js';
app.delete('/deletepickup', deletepickup, () => {
})

//Use only for tests.
app.post('/tests', () => {
})

//Use only for develop.
import { readDhlfileShipment } from '../endpoints/read-dhl-body.js';
app.get('/dhlfile', readDhlfileShipment, () => {
})

main()