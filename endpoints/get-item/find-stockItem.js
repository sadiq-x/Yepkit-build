import auth from 'yepkit-authorization';

import Item from '../../entities/item.js'

export async function readStockItem(req, res) {
    const item = new Item()
    if (req.body.search) {
        try{
            for (let search in req.body.search) {
                switch (search) {
                    case "id":
                        item.getStockItemById(req.body.search.id)
                        break
                    case "name":
                        item.getStockItemByName(req.body.search.name)
                        break
                    case "reference":
                        item.getStockItemByReference(req.body.search.reference)
                        break
                    case "type":
                        item.getStockItemByType(req.body.search.type)
                        break
                    case "all":
                        item.getAllStock()
                        break
                    default:
                        res.status(401).json('Error searching for stock parameters')
                        break
                }
            }
        }catch(e){console.log('Request body error')}        
        res.end()
    } else {
        res.status(401).json('Request body error')
    }
}