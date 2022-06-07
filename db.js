// import dotenv from "dotenv/config";
// const URI = process.env.MONGODB;

import mongodb from "mongodb";
const { MongoClient } = mongodb;
//Uri are allocated in variable environment, if not set, use URI in the file .env
const client = new MongoClient(process.env.MONGO_DB || process.env.URI);
const dbName = 'Yepkit-build';

let clientConnect;
//DbConnect(), função utilizada para ligar a DataBase
export async function DbConnect() {
    console.log('Database will be connect...');
    client.connect().then(() => { clientConnect = client.db(dbName)})
}

/*getClient(), é uma função que retorna o client.db(dbName), 
podemos considerar que é um middleware para as funções de cada end-point */
export function getClient() {
    if (clientConnect) {
        console.log('Client-db is reading...')
        return clientConnect
    } else { console.log('Error clientClient'); }
}