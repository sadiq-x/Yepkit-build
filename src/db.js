const URI = process.env.MONGO_DB;
import {MongoClient} from 'mongodb';
const client = new MongoClient(URI);
const dbName = 'Yepkit-build';

let clientconnect;

export async function dbConnect(){
    return client.connect().then(()=>{
        console.log('Database connect.')
        clientconnect = client.db(dbName)
        return true
    })
}

export function getClient(){
    if(clientconnect){
        return clientconnect
    }
}