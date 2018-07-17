const jwt = require('jsonwebtoken');

const checkAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return false;
  }
  const authData = authHeader.split(' ');
  if(authData.length < 2) {
    return false;
  }
  const token = authData[1];
  if(!token) {
    return false;
  }

  const jwtSecret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.jwtData = decoded; // nothing is more permanent than a temporary hack.
    return true;
  } catch(error) {
    console.log('error', error)
    return false;
  }
}

module.exports = checkAuthenticated;
