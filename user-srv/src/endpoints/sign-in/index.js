import LogClass from 'yepkit-logger';
const log = new LogClass('sign-in');
import Auth from 'yepkit-authorization';
const keyName = 'userSrvKey';
const issuer = 'yepkit';
const audience = 'yepkit';
const auth = Auth(keyName, issuer, audience);
import User from '../../entities/user.js';


export default async function handle(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      error: "sign in error",
      message: "No request body"
    });
    return;
  } else {
    if (!req.body.hasOwnProperty("guest")) {
      res.status(400).json({
        error: "sign in error",
        message: "Invalid request body"
      });
      return;
    }
  }

  // First lets check if it's a guest sign-in
  if (req.body.guest) {
    const dataJWT = {
      user: {
        role: "guest"
      }
    };
    const time2expire = process.env.JWT_EXP || 60 * 60 * 24;  // 24 hours
    const subject = process.env.JWT_SUB || "yepkit";
    const jwt = auth.issueJWT(dataJWT, time2expire, subject);
    res.status(200).json({
      jwt: jwt,
      expiresIn: time2expire,
      role: "guest"
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).json({
      error: "sign in error",
      message: "No request body"
    });
    return;
  }
  const user = new User();
  try {
    const out = await user.fetchByEmail(req.body.email);
    if (!out) {
      res.status(404).json({
        error: "sign in error",
        message: "Unable to sign you in."
      });
      return;
    }
  } catch (err) {
    log.error(err);
    res.status(404).json({
      error: "sign in error",
      message: "Unable to sign you in."
    });
  }
  
  if (user.validatePassword(req.body.pwd)) {
    // create and send JWT
    const dataJWT = {
      user: {
        id: user.getId(),
        role: user.getRole()
      }
    };
    const time2expire = process.env.JWT_EXP || 60 * 60 * 24;  // 24 hours
    const subject = "yepkit";
    const jwt = auth.issueJWT(dataJWT, time2expire, subject);
    res.status(200).json({
      jwt: jwt,
      userId: user.getId(),
      firstName: user.getFirstName(),
      role: user.getRole(),
      expiresIn: time2expire
    });
    return;
  } else {
    // Respond error
    res.status(406).json({
      error: "sign in error",
      message: "Unable to sign you in."
    });
  }
}

