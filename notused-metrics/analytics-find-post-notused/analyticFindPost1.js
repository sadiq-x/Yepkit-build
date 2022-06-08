import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import { getClient } from './db.js.js'

export async function analysticFindPost(req, res, next) {
    try {
        const clientDb = getClient()
        const queryY = req.body.year
        const queryM = req.body.month
        console.log({ statusCode: res.statusCode })
        const params = req.params.a
        switch (params) {
            case 'y':
                const dateY = Date.UTC(queryY, 11, 31)
                const ay = { 'Year': queryY, 'UserData': await clientDb.collection('Analystic').find({ Date: { $gt: Date.UTC(queryY, 0, 1), $lte: dateY } }).toArray() }
                res.send(ay)
                console.log(ay)
                break
            case 'm':
                const dateM = Date.UTC(queryY, queryM, 31)
                const am = { 'Year': queryY, 'Month': queryM, 'UserData': await clientDb.collection('Analystic').find({ Date: { $gt: Date.UTC(queryY, queryM, 0), $lte: dateM } }).toArray() }
                res.send(am)
                console.log(am)
                break
            case 'd':
                const dateD = await clientDb.collection('Analystic').find({}).toArray()
                res.send({ 'Analystic data': dateD })
                console.log(dateD)
                break
        }
    } catch (e) { console.log(e) }
    next()
}

