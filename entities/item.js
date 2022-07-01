import { dbConnect, getClient } from "../src/db.js";
const collectionName = 'Stocks';

import { ObjectId } from 'mongodb';

export default class Item {
    constructor() {
        this.doc = {
            user: null,              // string
            email: null,             // string
            password: null,          // string
            sockItem: {
                type: null,          // string  Product,Debug or Component
                name: null,          // string  Name
                quantity: null,      // string  Quantity
                reference: null,     // string  Reference of product, debug or component
                date: null           // date    Date
            },
            status: "uncorfirmed"   //string, "uncorfimed"| "confirmed" 
            //Status will confirm that the document has been sent
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

    //Email Get/Set
    setEmail(value) {
        this.doc.email = value
    }
    getEmail() {
        return this.doc.email
    }

    //Password Get/Set
    setPassword(value) {
        this.doc.password = value
    }
    getPassword() {
        return this.doc.password
    }

    //StockItem Get/Set
    setStockItem(value) {
        this.doc.sockItem = value
        this.doc.sockItem.date = Date.now()
    }
    getStockItem() {
        return this.doc.sockItem
    }

    //Status Get/Set
    getStatus() {
        return this.doc.status
    }
    setStatus(value) {
        this.doc.status = value
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
    async sendStockItem(doc) {
        if (doc && doc == this.doc.sockItem ) {
            let collection = getClient().collection(collectionName)
            const result = await collection.insertOne( doc )
            console.log('Inserted document accepted', result.insertedId)
        } else {
            console.log(new Error('Inserted document dennied'))
        }
    }

    /** Get Stock with the provided name. */
    async getStockItemByName(nameItem) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({ name: nameItem })
        if (result) {
            console.log(result, 'name')
        } else {
            console.log(new Error('No name found'))
        }
    }

    /** Get Stock with the provided id. */
    async getStockItemById(id) {
        let collection = getClient().collection(collectionName)
        const result = await collection.findOne({ _id: new ObjectId(id) })
        if (result) {
            console.log(result, 'id')
        } else {
            console.log(new Error('No id found'))
        }
    }

    /** Get Stock with the provided reference. */
    async getStockItemByReference(ref) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({ reference: ref })
        if (result) {
            console.log(result, 'reference')
        } else {
            console.log(new Error('No reference found'))
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