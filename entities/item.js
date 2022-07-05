import { dbConnect, getClient } from "../src/db.js";
const collectionName = 'Stocks';

import { ObjectId } from 'mongodb';

export default class Item {
    constructor() {
        this.doc = {
            user: null,              // string  Required.
            stockItem: {
                type: null,          // string - Required. Product,Debug or Component.
                name: null,          // string - Required. Name.
                quantity: null,      // string - Required. Quantity.
                reference: null,     // string - Required. Reference of product, debug or component.
                date: null           // Date - Required. The date is automatically inserted.
            }
        }
    }

    //Document operations

    //User Set
    setUser(value) {
        this.doc.user = value
    }
    //StockItem Get/Set
    setStockItem(value) {
        this.doc.stockItem = value
        this.doc.stockItem.date = Date.now()
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
            return ('Inserted document accepted', result.insertedId)
        } else {
            console.log('Inserted document dennied')
        }
    }

    /** Get all Stock. */
    async getAllStock() {
        let collection = await getClient().collection(collectionName)
        const result = await collection.find({}).toArray()
        if (result) {
            console.log(result, 'all results')
        } else {
            console.log('No result found')
        }
    }

    /** Get Stock with the provided name. 
     * Required name. */
    async getStockItemByName(nameItem) {
        let collection = await getClient().collection(collectionName)
        const result = await collection.findOne({ 'stockItem.name': nameItem })
        if (result) {
            console.log(result, 'results for name')
        } else {
            console.log('No name found')
        }
    }

    /** Get Stock with the provided id. 
     * Required id. */
    async getStockItemById(id) {
        try {
            let collection = getClient().collection(collectionName)
            const result = await collection.findOne({ _id: new ObjectId(id) })
            if (result) {
                console.log(result, 'results for id')
            } else {
                console.log('No id found')
            }
        } catch (e) { console.log('No id found') }
    }

    /** Get Stock with the provided reference. 
     * Required reference. */
    async getStockItemByReference(ref) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({ 'stockItem.reference': ref })
        if (result) {
            console.log(result, 'results for reference')
        } else {
            console.log('No reference found')
        }
    }

    /** Get Stock with the provided type. 
     * Required type. */
    async getStockItemByType(type) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.find({ 'stockItem.type': { $all: [type] } }).toArray()
        if (result && result.length >= 1) {
            console.log(result, 'results for type')
        } else {
            console.log('No type found')
        }
    }

    /** Delete document with the provided id. 
     * Required id. */
    async deleteStockById(id) {
        try {
            let collection = getClient().collection(collectionName)
            const result = await collection.deleteOne({ _id: new ObjectId(id) })
            if (result.deletedCount === 1) {
                console.log(Date.now(), " Successfully deleted  document");
            } else {
                console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
            }
        } catch (e) { console.log(Date.now(), " No documents matched the query. Deleted 0 documents") }
    }

    /** Delete document with the provided nameItem. 
     * Required nameItem. */
    async deleteStockByName(nameItem) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ 'stockItem.name': nameItem })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted document", nameItem);
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
        }
    }

    /** Delete document with the provided reference. 
     * Required reference. */
    async deleteStockByReference(ref) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ 'stockItem.reference': ref })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted document", ref);
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
        }
    }

    /** Update document with the provided id. 
     * Required id and completed document stock. */
    async updateStockbyId(id) {
        try {
            let collection = getClient().collection(collectionName)
            const query = { _id: new ObjectId(id) }
            const result = await collection.updateMany(query, { $set: this.doc })
            if (result.modifiedCount >= 1 ) {
                console.log(this.getStockItem().date, " Successfully update document", id);
            } else {
                console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
            }
        } catch {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
        }
    }
}