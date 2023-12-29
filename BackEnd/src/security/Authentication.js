const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const tokenPrefix = process.env.TOKEN_PREFIX;
  const tokenHeader = req.header(tokenHeaderKey);

  if (!tokenHeader) {
    return res.status(401).json({ error: 'Access Denied - Missing Token' });
  }

  if (tokenHeader.startsWith(`${tokenPrefix} `)) {
    const token = tokenHeader.slice(tokenPrefix.length + 1);

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.status(401).json({ error: 'Invalid Token',errormessage:'TokenExpiredError: jwt expired' });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Invalid Authorization Header Format' });
  }
}

module.exports = {
  authenticateToken,
};
