import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import { getClient } from './db.js';

import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster'


export async function analytic(req, res) {
    let token = jwtoken(req.headers)
    const clientDb = getClient()
    const user = { Host: req.headers.host, Date: Date.now(), UserAgent: req.headers["user-agent"], Ip: req.ip, Url: req.originalUrl, Protocol: req.protocol, Path: req.path }
    const verify = jwt.verify(token, privatekey)
    if (verify) {await clientDb.collection('Analystic').insertOne(user)}
};

function jwtoken(payload) {
    return jwt.sign(payload, privatekey)
};