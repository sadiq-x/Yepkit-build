import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import { getClient } from './db.js'

export async function analyticsfindpost(req, res, next) {
    if (req.headers) {
        const clientDb = getClient()
        const findData = { 'day-start': req.body.dayStart, 'month-start': req.body.monthStart, 'year-start': req.body.yearStart, 'day-end': req.body.dayEnd, 'month-end': req.body.monthEnd, 'year-end': req.body.yearEnd }
        console.log(findData)
        const inicialDate = Date.UTC(findData['year-start'], findData['month-start'], findData['day-start'])
        const finalDate = Date.UTC(findData['year-end'], findData['month-end'], findData['day-end'])
        if (finalDate > inicialDate && findData) {
            const userData = { 'Start of date': inicialDate, 'End of date': finalDate, 'UserData': await clientDb.collection('Analystic').find({ Date: { $gt: inicialDate, $lte: finalDate } }).toArray() }
            res.send(userData)
            console.log(userData, `total results:${userData.UserData.length}`)
        } else {
            console.log('Enter valid data for the search for users.')
            res.send('Enter valid data for the search for users.')
        }
    } else { console.log('Access denied') }
    console.log({ statusCode: res.statusCode })
    next()
}

