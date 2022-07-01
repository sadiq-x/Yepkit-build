import { event } from '../../services/events.js';
import Auth from 'yepkit-authorization';
const keyName = 'userSrvKey';
const issuer = 'yepkit';
const audience = 'yepkit';
const auth = Auth(keyName, issuer, audience);
import User from '../../entities/user.js';



export default async function handle(req, res, next) {
  // Decode a JWT in the request
  const decoded = auth.decodeJwt(req);
  if(!decoded) {
    res.status(401).end();
    return;
  }
  
  // Only super-admin may delete a user
  if (decoded.user.role.toLowerCase() === "super-admin") {
    // Delete user doc
    try {
      const user = new User();
      const count = await user.deleteById(req.body.id);
      if (count === 1) {
        res.status(200).end();
      } else {
        res.status(400).end();
      }
    } catch (err) {
      console.log(Date.now(), " " + err);
      res.status(401).end();
      return;
    }
  } else {
    res.status(401).end();
  }
}


