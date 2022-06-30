import { dbConnect, getClient } from "../src/db.js";
const collectionName = 'Stocks';

import { ObjectId } from 'mongodb';

export default class Item {
    constructor() {
        this.doc = {
            user: null,
            password: null,
            sockItem: {
                name: null,
                quantity: null,
                date: null
            },
            stockDebug: {
                name: null,
                quantity: null,
                date: null
            },
            status: "uncorfirmed"   //string, "uncorfimed"| "confirmed"
        }
    }

    setUser(value) {
        if (!value) {
            console.log(new Error('Invalid user'))
        }
    }

    getUser() {
        return this.doc.user
    }

    setPassword(value) {
        if (!value) {
            console.log(new Error('Invalid password'))
        }
    }

    getPassword() {
        return this.doc.password
    }

    //Stock Item
    setStockItem(value) {
        if (value) {
            this.doc.sockItem = value
        }
    }

    getStockItem() {
        return this.doc.sockItem
    }

    //Stock Debugs
    setStockDegub(value) {
        if (value) {
            this.doc.stockDebug = value
        }
    }

    getStockDegub() {
        return this.doc.stockDebug
    }


    //Mongo Db CRUD operations

    async getStockItemByName(nameItem) {
        let colection = await getClient().collection(collectionName)
        const result = await colection.findOne({ name: nameItem })
        if (result) {
            console.log(result, 'n')
        } else {
            console.log(new Error('No item found'))
        }
    }

    async setStockItemByName(nameItem) {
        let collection = getClient().collection(collectionName)
        const result = await collection.find({ _id })
        console.log(result)
    }

    async getStockItemById(id) {
        let collection = getClient().collection(collectionName)
        const result = await collection.findOne({ _id: new ObjectId(id) })
        console.log(result, 'id')
    }

    /**  Delete document with the provided id */
    async deleteStockById(id) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted one document.");
            return true;
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents.");
            return false;
        }
    }

    /**
    * Delete document with the provided nameItem.
    */
    async deleteStockByName(nameItem) {
        let collection = getClient().collection(collectionName)
        const result = await collection.deleteOne({ name: nameItem })
        if (result.deletedCount === 1) {
            console.log(Date.now(), " Successfully deleted document.", nameItem);
            return true;
        } else {
            console.log(Date.now(), " No documents matched the query. Deleted 0 documents.");
            return false;
        }
    }
}