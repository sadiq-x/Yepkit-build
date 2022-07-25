import auth from 'yepkit-authorization';

import Item from "../../entities/item.js";

export async function createStockItem(req, res) {
    const item = new Item()
    if (req.body.stockItem.name && req.body.stockItem.reference && req.body.stockItem.quantity && req.body.stockItem.type) {
        item.setStockItem(req.body.stockItem)
        res.json(await item.sendStockItem())
    } else{
        res.json(false)
    }
}