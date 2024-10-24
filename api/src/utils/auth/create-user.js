const User = require('../../db/models/User')

function createUserMongo({ username, email, password, hashedPassword, res }) {
  const user = new User({
    username,
    email,
    password,
    passwordHash: hashedPassword,
    createdAt: new Date(),
  })

  try {
    user.save()
  } catch (err) {
    res
      .status(400)
      .send({ message: 'An error occurred while creating the user' })
  } finally {
    res.status(201).send({ message: 'User created successfully' })
  }
}

module.exports = createUserMongo
