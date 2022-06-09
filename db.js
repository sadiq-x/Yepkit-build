import mongodb from 'mongodb';
const { MongoClient } = mongodb;
const client = new MongoClient(process.env.MONGO_DB || process.env.URI);
const dbname = 'Yepkil-build';

let clientconnect;

export const dbconnect = () => client.connect().then(() => { clientconnect = client.db(dbname); return true }).catch((error) => { console.log(error) })

export function getClient() { if (clientconnect) { return clientconnect } }

