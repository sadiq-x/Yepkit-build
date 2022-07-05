import Auth from 'yepkit-authorization';

import Item from '../../entities/item.js'

export async function deleteStockItem(req, res) {
    const item = new Item()
    if (req.body.delete) {
        try{
            for (let del in req.body.delete) {
                switch (del) {
                    case "id":
                        item.deleteStockById(req.body.delete.id)
                        break
                    case "name":
                        item.deleteStockByName(req.body.delete.name)
                        break
                    case "reference":
                        item.deleteStockByReference(req.body.delete.reference)
                        break
                    default:
                        res.status(401).json('Error searching for delete parameters')
                        break
                }
            }
        }catch(e){console.log('Request body error')}        
        res.end()
    } else {
        res.status(401).json('Request body error')
    }
}