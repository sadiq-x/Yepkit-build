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
 * /read-user endpoind handler
 */
export default async function handle(req, res, next) {
  // Decode a JWT in the request
  const decoded = auth.decodeJwt(req);
  const jwtUserId = decoded.user.id;
  const userId = req.body.id;
  
  // Get the user from the database
  const user = new User();
  await user.fetchById(userId);
  if ((user.getId() === jwtUserId) || (roles.get(decoded.user.role.toLowerCase()) > user.getRole()) || (decoded.user.role.toLowerCase() === "super-admin")) {
    // Respond with user JSON 
    const doc = {
      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      role: user.getRole(),
      company: user.getCompany(),
      vatNumber: user.getVatNumber(),
      billingDetails: user.getBillingDetails(),
      shippingDetails: user.getShippingDetails(),
      status: user.getStatus()
    };

    res.status(200).json(doc);
  } 
}


