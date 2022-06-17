import express from 'express';
const app = express();
app.use(express.json());
//app.use(express.urlencoded());

import fetch from 'node-fetch';

import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import jwt from 'jsonwebtoken';
const privatekey = 'Yepkitmaster';

import { getClient } from '/home/rafael/Desktop/Yepkit-sadiq/ys2/db.js';


// const options = {
//   "method": "POST",
//   "headers": {
//     "content-type": "application/json",
//     "Message-Reference": process.env.MESSAGE_REFERENCE,
//     "Message-Reference-Date": process.env.MESSAGE_REFERENCE_DATE,
//     "Plugin-Name": process.env.PLUGIN_NAME,
//     "Plugin-Version": process.env.PLUGIN_VERSION,
//     "Shipping-System-Platform-Name": process.env.SHIPPING_SYSTEM_PLATFORM_NAME,
//     "Shipping-System-Platform-Version": process.env.SHIPPING_SYSTEM_PLATFORM_VERSION,
//     "Webstore-Platform-Name": process.env.WEBSTORE_PLATFORM_NAME,
//     "Webstore-Platform-Version": process.env.WEBSTORE_PLATFORM_VERSION,
//     "Authorization": process.env.AUTHORIZATION
//   }
// };

const options = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
}

//let url = 'https://api-mock.dhl.com/mydhlapi/shipments';
let url = 'https://reqres.in/api/users'

export async function createorder(req, res) {
  const client = getClient()
  const token = jwtoken(req.headers)
  const verify = jwt.verify(token, privatekey)
  if (verify) {
    options.body = JSON.stringify(req.body)
    if (options.body) {
      const jsonfetch = await fetchutl(options)
      const user = datauser(req, jsonfetch)
      await client.collection('Users').insertOne(user)
    }
  }
}

async function fetchutl(data) {
  return fetch(url, data)
    .then(res => res.json())
    .then(json => { console.log(json,'Fetch complete.');return json})
    .catch(e => console.error('error:' + e));
}

//Json web token
function jwtoken(payload) {
  return jwt.sign(payload, privatekey)
}

//Data from user when entry to endpoint
function datauser(req, body) {
  const user = {
    host: req.headers.host,
    ip: req.ip,
    path: req.path,
    date: Date.now(),
    dataDhl: body
  }
  console.log(user,'User data view.')
  return user
}