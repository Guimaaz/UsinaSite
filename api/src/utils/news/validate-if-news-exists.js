function validateIfNewsExists(newsDb, { name }) {
  newsDb.get('SELECT * FROM news WHERE name = ?', [name], (err, news) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' })
    }

    if (news) {
      return true
    }

    return false
  })
}

module.exports = validateIfNewsExists
