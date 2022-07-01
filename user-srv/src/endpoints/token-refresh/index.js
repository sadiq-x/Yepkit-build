import Auth from 'yepkit-authorization';
const keyName = 'userSrvKey';
const issuer = 'yepkit';
const audience = 'yepkit';
const auth = Auth(keyName, issuer, audience);
import User from '../../entities/user.js';

const roles = new Map([
  ["guest", 0],
  ["user", 1],
  ["admin", 2],
  ["super-admin", 3],
]);


/**
 * /token-refresh endpoind handler
 *
 * Endpoint to refresh a aging JWT. 
 * Clients should keep track of the JWT’s age and request a refresh before it expires.
 */
export default function handle(req, res, next) {
  // Decode a JWT in the request
  const decoded = auth.decodeJwt(req);
  if (!decoded) {
    res.status(401).end();
  }
  // If the jwt is still valid we will reissue a new one with the same data
  // and send it back to the requester client.
  const time2expire = 60 * 60 * 2;  // 2 hours
  const subject = "yepkit";
  const jwt = auth.issueJWT(decoded.user, time2expire, subject);
  res.status(200).json({
    jwt: jwt,
    expiresIn: time2expire
  });
}
