import auth from 'yepkit-authorization';

import Item from '../../entities/item.js'

export async function readStockItem(req, res) {
    const item = new Item()
    if (req.body.search) {
        try {
            for (let search in req.body.search) {
                switch (search) {
                    case "id":
                        res.json(await item.getStockItemById(req.body.search.id))
                        break
                    case "name":
                        res.json(await item.getStockItemByName(req.body.search.name))
                        break
                    case "reference":
                        res.json(await item.getStockItemByReference(req.body.search.reference))
                        break
                    case "all":
                        res.json(await item.getAllStock())
                        break
                    default:
                        res.json(false)
                        break
                }
            }
        } catch (e) {
            console.log(e)
        }
        res.end()
    } else {
        res.json(false)
    }
}