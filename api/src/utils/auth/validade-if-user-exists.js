const User = require('../../db/models/User')

async function validateIfUserExistsMongo(
  username,
  email,
  onlyUsername = false
) {
  if (onlyUsername === true) {
    const userExists = await User.find({ username })

    if (userExists.length > 0) return userExists

    return false
  }

  const userExists = await User.find({ username, email })

  if (userExists.length > 0) return userExists

  return false
}

module.exports = validateIfUserExistsMongo
