import Item from "../../entities/item.js";

export async function createStockItem(req, res) {
    const item = new Item()
    if (req.body.stockItem && req.body.user) {
        item.setUser(req.body.user)
        item.setStockItem(req.body.stockItem)
        item.sendStockItem()
        console.log(item.getStockItem(), 'ok')
        res.status(200).json(item.getStockItem())
    } else{
        res.status(401).json('Error to send stock')
    }
}