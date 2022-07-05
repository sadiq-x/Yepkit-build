import auth from "yepkit-authorization";

import Item from "../../entities/item.js";

export async function updateStockItem(req, res) {
    const item = new Item()
    const id = req.body.id
    if (req.body.user && req.body.stockItem && id) {
        try {
            for (let update in req.body) {
                switch (update) {
                    case "user":
                        item.setUser(req.body.user)
                        break
                    case "stockItem":
                        item.setStockItem(req.body.stockItem)
                        break
                    case "id":
                        break
                    }
            }
            item.updateStockbyId(id)
        } catch (e) { console.log('Request body error') }
        res.end()
    } else {
        res.status(401).json('Request body error')
    }
}


