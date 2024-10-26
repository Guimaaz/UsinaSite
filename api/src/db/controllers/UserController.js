const bcrypt = require('bcryptjs')

const User = require('../models/User')

class UserController {
  username
  email
  password
  res

  constructor(username, email, password, res) {
    this.username = username
    this.email = email
    this.password = password
    this.res = res
  }

  store() {
    const hashedPassword = bcrypt.hashSync(this.password, 8)

    const user = new User({
      username: this.username,
      email: this.email,
      password: this.password,
      passwordHash: hashedPassword,
      createdAt: new Date(),
    })

    try {
      user.save()
    } catch (err) {
      this.res
        .status(400)
        .send({ message: 'An error occurred while creating the user' })
    } finally {
      this.res.status(201).send({ message: 'User created successfully' })
    }
  }

  async validateIfExists(onlyUsername) {
    if (onlyUsername) {
      const userExists = await User.find({ username: this.username })

      return userExists.length > 0 ? userExists : false
    }

    const userExists = await User.find({
      username: this.username,
      email: this.email,
    })

    return userExists.length > 0 ? userExists : false
  }
}

module.exports = UserController
