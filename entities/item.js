import { dbConnect, getClient } from "../src/db.js";
const collectionName = 'Stocks';

import { ObjectId } from 'mongodb';

export default class Item {
    constructor() {
        this.doc = {             // string  Required.
            stockItem: {
                type: null,          // string - Required. Product,Debug or Component.
                name: null,          // string - Required. Name.
                quantity: null,      // string - Required. Quantity.
                reference: null,     // string - Required. Reference of product, debug or component.
                data: null           // Date - Required. The date is automatically inserted.
            }
        }
    }

    //Document operations

    //StockItem Get/Set
    setStockItem(value) {
        this.doc.stockItem = value
        this.doc.stockItem.data = Date.now()
    }
    getStockItem() {
        return this.doc.stockItem
    }

    //Mongo Db operations

    /** Send Stock with the provided document filled with stock.
     * Required stock. */
    async sendStockItem() {
        if (this.doc) {
            let collection = getClient().collection(collectionName)
            const result = await collection.insertOne(this.doc)
            return (true, result.insertedId)
        } else {
            return false
        }
    }

    /** Get all Stock. */
    async getAllStock() {
        let collection = await getClient().collection(collectionName)
        const result = await collection.find({}).toArray()
        if (result) {
            return result
        } else {
            return false
        }
    }

    /** Get Stock with the provided name. 
     * Required name. */
    async getStockItemByName(nameItem) {
        let collection = await getClient().collection(collectionName)
        const result = await collection.findOne({ 'stockItem.name': nameItem })
        if (result) {
            return result
        } else {
            return false
        }
    }

    /** Get Stock with the provided id. 
     * Required id. */
    async getStockItemById(id) {
        try {
            let collection = getClient().collection(collectionName)
            const result = await collection.findOne({ _id: new ObjectId(id) })
            if (result) {
                return result
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }

    /** Get Stock with the provided reference. 
     * Required reference. */
    async getStockItemByReference(ref) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({ 'stockItem.reference': ref })
        if (result) {
            return result
        } else {
            return false
        }
    }

    /** Delete document with the provided id. 
     * Required id. */
    async deleteStockById(id) {
        try {
            let collection = getClient().collection(collectionName)
            const result = await collection.deleteOne({ _id: new ObjectId(id) })
            if (result.deletedCount === 1) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }

    /** Delete document with the provided nameItem. 
     * Required nameItem. */
    async deleteStockByName(nameItem) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ 'stockItem.name': nameItem })
        if (result.deletedCount === 1) {
            return true
        } else {
            return false
        }
    }

    /** Delete document with the provided reference. 
     * Required reference. */
    async deleteStockByReference(ref) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ 'stockItem.reference': ref })
        if (result.deletedCount === 1) {
            return true
        } else {
            return false
        }
    }

    /** Update document with the provided id. 
     * Required id and completed document stock. */
    async updateStockbyId(id) {
        try {
            let collection = getClient().collection(collectionName)
            const query = { _id: new ObjectId(id) }
            const result = await collection.updateMany(query, { $set: this.doc })
            if (result.modifiedCount >= 1) {
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }
}