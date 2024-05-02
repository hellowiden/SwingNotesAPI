const jwt = require('jsonwebtoken');

function generateAccessToken(userID) {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
}

//middleware
function authenticateToken(req, res, next) {

  //  REMEMBER TO REMOVE THIS BACKDOOR
  if ( req.query.backdoor === '1' ) {
  next()
  return
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken
};