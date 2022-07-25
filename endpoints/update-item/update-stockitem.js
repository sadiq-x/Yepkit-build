import auth from "yepkit-authorization";

import Item from "../../entities/item.js";

export async function updateStockItem(req, res) {
    const item = new Item()
    const id = req.body.id
    if (req.body.stockItem && id) {
        try {
            for (let update in req.body) {
                switch (update) {
                    case "stockItem":
                        item.setStockItem(req.body.stockItem)
                        break
                    case "id":
                        break
                }
            }
            res.json(await item.updateStockbyId(id))
        } catch (e) {
            return false
        }
        res.end()
    }
}


