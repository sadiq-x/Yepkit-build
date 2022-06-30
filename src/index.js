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

app.post('/insert-item')

app.get('/get-item')

app.delete('/delete-item')

app.put('/update-item')

import Item from '../entities/item.js'
app.get('/test', async (req, res) => {
    const item = new Item()
    //item.getStockItemByName('Ykush')
    //item.getStockItemById("62bdb279f0b3289ee6476eee")
    item.deleteStockById("62bdc136e48eab516588ef3e")
})
main()