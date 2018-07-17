const jwt = require('jsonwebtoken');

const mailToken = require('./mailToken.service');
const checkAuthenticated = require('./checkAuthenticated.util');

const handlers = {};

handlers.createToken = (req, res) => {
  const { email } = req.body;
  if(!email) {
    res.statusCode = 400;
    return res.json({
      message: 'Email not provided'
    })
  }
  const userData = {
    email
  }

  const jwtSecret = process.env.JWT_SECRET;

  jwt.sign(userData, jwtSecret, (error, token) => {
    if(error) {
      res.statusCode = 500;
      return res.json({
        message: 'Error in creating jwt'
      })
    }
    mailToken({ email, token }, () => {
      res.json({
        message: `Token has been mailed to ${email}`
      });
    })
  })
}

handlers.getJobs = (req, res) => {
  const isAuthenticated = checkAuthenticated(req);
  if(!isAuthenticated) {
    res.statusCode = 401;
    return res.json({
      message: 'Not Authenticated'
    })
  }
  res.json({
    data: {
      jobs: ['a', 'b', 'c']
    }
  });
}

module.exports = handlers;
