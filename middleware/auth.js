const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // This gets the token from 'Bearer yourJWTtoken'

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Set the user id in the request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
