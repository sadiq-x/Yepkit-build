import express from "express";
const app = express();
const PORT = process.env.PORT_SRV || 9999;

import { DbConnect } from '../db.js'

app.use(express.json()); // for parsing application/json
//app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let state = false   //Variable that defines the state of the connection to the Database.
//Database connect
export async function main() {
    await DbConnect().then(() => { return state = true })
    if (state) {
        console.log(`Databse connect, state: ${state}`)
        try { CheckDb() } catch (e) { console.log(e) }
    } else { setTimeout(() => { main() }, 5000), console.log('MongoDb will be restarted.') }    //If the database does not connect, try again 5s later
}

//Server connect
export function CheckDb() {
    const DataNow = new Date(Date.now()).toUTCString();
    app.listen(PORT, () => { console.log(`Server up to ${PORT},`, DataNow) });
}

main()

//End-points
import analytic from '../analytics-user.js'
app.get('/analytics', analytic, (req, res, next) => { })

import { analyticsfindpost } from '../analytics-find-post.js'
app.post('/metrics', analyticsfindpost, (req, res, next) => { })

//Not used
app.post('/tests', (req, res, next) => { })
