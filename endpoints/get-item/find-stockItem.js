import Item from '../../entities/item.js'

export async function readStockItem(req, res) {
    const item = new Item()
    if(req.body.search){
        for (let search in req.body.search){
        switch(search) {
            case "id":
                item.getStockItemById(req.body.search.id)
                break
            case "nameItem":
                console.log('me')
                item.getStockItemByName(req.body.search.nameItem)
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
        }}
        res.end()
    }else {
        res.status(401).json('Error to find stock')
    }
}