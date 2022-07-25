import Auth from 'yepkit-authorization';

import Item from '../../entities/item.js'

export async function deleteStockItem(req, res) {
    const item = new Item()
    console.log(req.body.delete.length)
    if (req.body.delete) {
        try {
            for (let del in req.body.delete) {
                switch (del) {
                    case "id":
                        res.json(await item.deleteStockById(req.body.delete.id))
                        break
                    case "name":
                        res.json(await item.deleteStockByName(req.body.delete.name))
                        break
                    case "reference":
                        res.json(await item.deleteStockByReference(req.body.delete.reference))
                        break
                    default:
                        res.json(false)
                        break
                }
            }
        } catch (e) {
            console.log(e)
        }
    } else {
        res.json(false)
    }
}