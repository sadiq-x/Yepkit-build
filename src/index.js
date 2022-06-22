import express from 'express';
const app = express();

app.use(express.json());
//app.use(express.urlencoded());

//Server Port (environment variable).
const PORT = process.env.PORT_SRV || 9555

//Function to start server.
function server() {
    app.listen(PORT, () => { console.log(`Sever connection stable (${PORT})`, PORT ? true : false) })
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

server()