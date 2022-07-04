import express from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.PORT_SRV || 9555
let state;

import { dbConnect } from '../src/db.js'
async function main() {
    state = await dbConnect()
    if (state) {
        startServer()
    }else{
        setTimeout(()=>{main()},5000,console.log('reconnecting'))
    }
}

function startServer() {
    if (state) {
        app.listen(PORT, () => {
            console.log(`Service is running on port ${PORT}`, true);
        })
    }
}
import {createStockItem} from '../endpoints/insert-item/create-stockItem.js'
app.post('/insertstock',createStockItem)

import {readStockItem} from '../endpoints/get-item/find-stockItem.js'
app.post('/readstock',readStockItem)

app.delete('/delete-item')

app.put('/update-item')

import Item from '../entities/item.js'
app.get('/test', async (req, res) => {
    const item = new Item()
    console.log(item)
})
main()