const jwt = require('jsonwebtoken')
const env = require('../utils/env')

function authenticate(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).send({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}

module.exports = authenticate
