const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Cart = require('../models/Cart')

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

  async store() {
    const hashedPassword = bcrypt.hashSync(this.password, 8)

    // const cart = await new Cart().save()

    const user = new User({
      username: this.username,
      email: this.email,
      password: this.password,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      // cart: cart._id,
    })

    try {
      await user.save()

      const cart = new Cart({ user: user._id })
      await cart.save()

      user.cart = cart._id
      await user.save()
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

  async updatePassword(newPassword) {
    try {
      const user = await User.findOne({ email: this.email })

      if (!user) {
        return this.res
          .status(404)
          .send({ message: `User with email: ${this.email} wasn't found` })
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 8)
      user.password = newPassword
      user.passwordHash = hashedPassword

      await user.save()

      return this.res.status(200).send({
        message: `Password updated successfully for user ${this.email}`,
      })
    } catch (e) {
      return this.res
        .status(500)
        .send({ message: `Error updating password for user ${this.email}` })
    }
  }
}

module.exports = UserController
