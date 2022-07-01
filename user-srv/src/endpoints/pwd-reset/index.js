/**
 * Endpoint: /pwd-reset
 * This endpoin
 */

import Auth from "yepkit-authorization";
const keyName = 'userSrvKey';
const issuer = 'yepkit';
const audience = 'yepkit';
const auth = Auth(keyName, issuer, audience);


export default async function handle(req, res, next) {
  // Authorized?


  // check the request action. It must be one of two:
  // 1. "trigger-reset"
  // 2. "new-password"
   
  
}
