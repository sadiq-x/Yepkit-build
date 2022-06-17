import express from 'express';
const app = express();
const PORT = process.env.PORT_SRV || 9995;

app.use(express.json())

let state;

import { dbconnect } from '../db.js'
//Database connect
async function main() {
    state = await dbconnect()
    console.log(await dbconnect())
    if (state) {
        serverConnect(console.log('Server status', state))
    } else {
        setTimeout(() => { main() }, 5000, console.log('restarting'))
    }
}

//Server connect
function serverConnect() {
    const datanow = new Date(Date.now()).toUTCString();
    app.listen(PORT, () => { console.log(`Server up on ${PORT},`, datanow) });
}

main()

//Endpoints
import { createorder } from './endpoints/create-order.js'
app.post('/createorder', createorder, (req, res) => { 
})

app.post('/uporder', () => {

})
app.get('/readorder', () => {

})
app.delete('/deleteorder', () => {

})

//Not used
import dotenv from 'dotenv/config'
app.get('/test', (req) => {
})