import express from 'express';
const app = express();
const port = process.env.SERVICE_PORT || 3004;
import appInit from './modules/init.js';

import LogClass from 'yepkit-logger';
const log = new LogClass('src/index.js');

// MongoDB
import { dbConnect, getDbConn, dbClose } from 'yepkit-mongodb';
const dbName = 'users';
const mongodbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

// Kafka
import { initEvents } from './services/events.js';
initEvents();

import Auth from 'yepkit-authorization';
const keyName = process.env.JWT_KEYNAME || 'userSrvKey';
const issuer = process.env.JWT_ISS || 'yepkit';
const audience = process.env.JWT_AUD || 'yepkit';
const auth = Auth(keyName, issuer, audience);
auth.init();

function startServer() {
  app.listen(port, () => {
    log.info('Service is running on port ' + port);
  });
}

// Connect to database aux functions
function connectToDb() {
  log.info('Trying to connect to database...');
  dbConnect(dbName, mongodbURI).then((dbObj) => {
    checkDbConnection();
  }).catch(e => {
    checkDbConnection();
  });
}

function checkDbConnection() {
  try {
    let conn = getDbConn();
    if (conn) {
      log.info('Connected to database.');
    }
  } catch (e) {
    log.error(e);
    setTimeout(connectToDb, 10000);
  };
}

function checkAllReady() {
  try {
    let conn = getDbConn();
    if (conn && auth.checkReady()) {
      appInit().then( startServer );
      //startServer();
    } else {
      console.log('Not ready yet, waiting...');
      setTimeout(checkAllReady, 30000);
    }
  } catch (e) {
    log.error(e);
    console.log('Not ready yet, waiting...');
    setTimeout(checkAllReady, 30000);
  };
}

connectToDb();
checkAllReady();


app.use(express.json());

// Routes
//app.post('/create-user', express.json());
import createUser from './endpoints/create-user/index.js';
app.post('/create-user', createUser);

import readUser from './endpoints/read-user/index.js';
app.post('/read-user', readUser);

import updateUser from './endpoints/update-user/index.js';
app.post('/update-user', updateUser);

import deleteUser from './endpoints/delete-user/index.js';
app.post('/delete-user', deleteUser);

import signin from './endpoints/sign-in/index.js';
app.post('/sign-in', signin);

import tokenRefresh from './endpoints/token-refresh/index.js';
app.post('/token-refresh', tokenRefresh);

import pwdReset from "./endpoints/pwd-reset/index.js";
app.post("/pwd-reset", pwdReset);



