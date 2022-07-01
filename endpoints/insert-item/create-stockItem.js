import Item from "../../entities/item.js";

import { getClient } from "../../src/db.js";


export async function createStockItem(req, res) {
    const item = new Item()
    if (req.body.name && req.body.quantity) {
        item.setStockItem(req.body)
        item.setStatus("Confirmed")
        console.log(item.getStockItem(), 'ok')
        res.status(200).json(item.getStatus())
    } else{
        res.status(401).json(item.getStatus())
    }
}