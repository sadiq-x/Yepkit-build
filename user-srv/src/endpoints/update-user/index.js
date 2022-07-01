import LogClass from 'yepkit-logger';
const log = new LogClass('create-order');
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


export default async function handle(req, res, next) {
  // Decode a JWT in the request
  const decoded = auth.decodeJwt(req);
  const jwtUserId = decoded.user.id;
  const userId = req.body.id;
  
  // Get the user from the database
  const user = new User();
  await user.fetchById(userId);
  if ((user.getId() === jwtUserId) || (roles.get(decoded.user.role.toLowerCase()) > user.getRole()) || (decoded.user.role.toLowerCase() === "super-admin")) {
    // Update user
    for (let updateProperty in req.body.updateProperties) {
      switch (updateProperty) {
        case "email":
          user.setEmail(req.body.updateProperties.email);
          break;
        case "firstName":
          user.setFirstName(req.body.updateProperties.firstName);
          break;
        case "lastName":
          user.setLastName(req.body.updateProperties.lastName);
          break;
        case "password":
          user.setPassword(req.body.updateProperties.password);
          break;
        case "company":
          user.setCompany(req.body.updateProperties.company);
          break; 
        case "billingDetails":
          user.setBillingDetails(req.body.updateProperties.billingDetails);
          break; 
        case "shippingDetails":
          user.setShippingDetails(req.body.updateProperties.shippingDetails);
          break; 
        default:
          break;
      }
    }

    // For properties that can only be updated by an admin or super-admin
    if (roles.get(decoded.user.role.toLowerCase()) >= "admin") {
      for (let updateProperty in req.body.updateProperties) {
        switch (updateProperty) {
          case "status":
            user.setStatus(req.body.updateProperties.status);
            break;
          default:
            break;
        }
      }
    }

    // For properties that can only be updated by a super-user
    if (decoded.user.role.toLowerCase() === "super-admin") {
      for (let updateProperty in req.body.updateProperties) {
        switch (updateProperty) {
          case "role":
            user.setRole(req.body.updateProperties.role);
            break;
          default:
            break;
        }
      }
    }

    try {
      await user.flush();
      res.status(200).end();
    } catch (err) {
      console.log(Date.now(), ' ' + err);
      // Respond error
      res.status(409).json({
        error: "update-error",
        message: "Error updating user data"
      });
    }
  }

}



