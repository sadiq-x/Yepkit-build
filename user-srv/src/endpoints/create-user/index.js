import { event } from '../../services/events.js';
import LogClass from 'yepkit-logger';
const log = new LogClass('create-order');
import Auth from 'yepkit-authorization';
const keyName = 'userSrvKey';
const issuer = 'yepkit';
const audience = 'yepkit';
const auth = Auth(keyName, issuer, audience);
import User from '../../entities/user.js';



export default async function handle(req, res, next) {
 
  // Which role should the user have?
  if (req.body.role.toLowerCase() === "user") {
    // role = user can be created by any user
    if (!auth.checkAuthorized(req, 'guest')) {
      res.status(401).json({
        error: "Not authorized",
        message: "Not authorized"
      });
      return; 
    }
  } else if ((req.body.role.toLowerCase() === "admin") || 
    (req.body.role.toLowerCase() === "super-admin")) {
    // Check if has admin permissions
    if (!auth.checkAuthorized(req, 'super-admin')) {
      res.status(401).json({
        error: "Not authorized",
        message: "Not authorized"
      });
      return;
    }
  } else {
    // Check if has admin permissions
    if (!auth.checkAuthorized(req, 'admin')) {
      res.status(401).json({
        error: "Not authorized",
        message: "Not authorized"
      });
      return;
    }
  }

  // Create user
  const user = new User();
  try {
    user.setEmail(req.body.email);
    await user.setPassword(req.body.pwd);
    user.setFirstName(req.body.firstname);
    user.setLastName(req.body.lastname);
    user.setRole(req.body.role);
    await user.persist(); 
    // Send success response
    res.status(200).json({
      id: user.getId(),
      firstname: user.getFirstName()
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "not_created",
      message: "Error creating the user"
    });
    return;
  }

  // Produce event
  event.userCreated({
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    role: req.body.role
  });
}



