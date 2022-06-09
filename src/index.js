import express from 'express';
const app = express();
const PORT = process.env.PORT_SRV || 9995;

let state;

import { dbconnect } from '../db.js'
//Database connect
async function main() {
    state = await dbconnect()
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
app.post('/createorder',()=>{

})
app.post('/uporder',()=>{
    
})
app.get('/readorder',()=>{
    
})
app.delete('/deleteorder',()=>{
    
})

import {getClient} from '../db.js'
//Not used
app.get('/test', () => { 
    console.log(getClient())
})
