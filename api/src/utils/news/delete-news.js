function deleteNews(newsDb, newsId) {
  newsDb.run('DELETE FROM news WHERE id = ?', [newsId], err => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' })
    }
  })

  return true
}

module.exports = deleteNews
