const jwt = require('jsonwebtoken')
const env = require('../utils/env')

function authenticate(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).send({ message: 'No token provided' })
  }

  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    req.userId = decoded.id
    next()
  })
}

module.exports = authenticate
