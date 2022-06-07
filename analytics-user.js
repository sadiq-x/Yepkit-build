import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import { getClient } from './db.js';

import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster'
let token;
export default async function analytic(req, res, next) {
    const clientDb = getClient()
    const user = { Host: req.headers.host, Date: Date.now(), UserAgent: req.headers["user-agent"], Ip: req.ip, Url: req.originalUrl, Protocol: req.protocol, Path: req.path }
    jwtoken(user)
    const token = jwt.sign(user, privatekey)
    if (jwt.verify(token, privatekey)) {
        try {
            await clientDb.collection('Analystic').insertOne(user)
            res.send('Yepkit analystic data')
        } catch (e) { console.log(e) }
    } else { console.log('Token was incorrect') }
    console.log({ statusCode: res.statusCode }, 'New entry data saved into database.')
    next()
}

function jwtoken(user){
    token = jwt.sign(user,privatekey)
}