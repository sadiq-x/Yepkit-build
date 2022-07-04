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

    //User Get/Set
    setUser(value) {
        this.doc.user = value
    }
    getUser() {
        return this.doc.user
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

    /**
   * Returns the mongoDB id object converted to string.
   * For example, for the following id oject
   * _id: new ObjectId("61826225d4e6aea7efe23355")
   * "61826225d4e6aea7efe23355" will be returned.
   */
    getId() {
        return this.doc._id.toString();
    }

    /** Send Stock with the provided document filled with stock.
     * Required stock. */
    async sendStockItem() {
        if (this.doc) {
            let collection = getClient().collection(collectionName)
            const result = await collection.insertOne(this.doc)
            console.log('Inserted document accepted', result)
        } else {
            console.log(new Error('Inserted document dennied'))
        }
    }

    async getAllStock(){
        let collection = await getClient().collection(collectionName)
        const result = await collection.findOne({})
        if (result) {
            console.log(result, 'all results')
        } else {
            console.log(new Error('No result found'))
        }
    }

    /** Get Stock with the provided name. */
    async getStockItemByName(nameItem) {
        let collection = await getClient().collection(collectionName)
        const result = await collection.findOne({'sockItem.name':nameItem})
        if (result) {
            console.log(result, 'results for name')
        } else {
            console.log(new Error('No name found'))
        }
    }

    /** Get Stock with the provided id. */
    async getStockItemById(id) {
        let collection = getClient().collection(collectionName)
        const result = await collection.findOne({ _id: new ObjectId(id) })
        if (result) {
            console.log(result, 'results for id')
        } else {
            console.log(new Error('No id found'))
        }
    }

    /** Get Stock with the provided reference. */
    async getStockItemByReference(ref) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({'sockItem.reference':ref})
        if (result) {
            console.log(result, 'results for reference')
        } else {
            console.log(new Error('No reference found'))
        }
    }

    /** Get Stock with the provided reference. */
    async getStockItemByType(type) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({'sockItem.type':type})
        if (result) {
            console.log(result, 'results for type')
        } else {
            console.log(new Error('No type found'))
        }
    }

    /** Delete document with the provided id. */
    async deleteStockById(id) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted one document");
            return true;
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
            return false;
        }
    }

    /** Delete document with the provided nameItem. */
    async deleteStockByName(nameItem) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ name: nameItem })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted document", nameItem);
            return true;
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
            return false;
        }
    }

    /** Delete document with the provided type. */
    async deleteStockByType(typ) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ type: typ })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted document", typ);
            return true;
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
            return false;
        }
    }

    /** Delete document with the provided reference. */
    async deleteStockByReference(ref) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ reference: ref })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted document", ref);
            return true;
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents");
            return false;
        }
    }
}