import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import { getClient } from './db.js'

import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster'

export async function analyticsfindpost(req, res) {
    let token = jwtoken(req.headers)
    const clientDb = getClient()
    const verify = jwt.verify(token, privatekey)
    if (verify) {
        const findData = { 'day-start': req.body.dayStart, 'month-start': req.body.monthStart, 'year-start': req.body.yearStart, 'day-end': req.body.dayEnd, 'month-end': req.body.monthEnd, 'year-end': req.body.yearEnd }
        const inicialDate = Date.UTC(findData['year-start'], findData['month-start'], findData['day-start'])
        const finalDate = Date.UTC(findData['year-end'], findData['month-end'], findData['day-end'])
        if (finalDate > inicialDate) {
            const userData = { 'UserData': await clientDb.collection('Analystic').find({ Date: { $gt: inicialDate, $lte: finalDate } }).toArray() }; console.log(userData)
        } else if (findData) { const userData = { 'UserData': await clientDb.collection('Analystic').find().toArray() }; console.log(userData) }
    }
}

function jwtoken(payload) {
    return jwt.sign(payload, privatekey)
}