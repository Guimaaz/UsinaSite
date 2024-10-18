// biome-ignore lint/style/useDefaultParameterLast: <explanation>
function getNews(newsDb, whichNews = 'all', newsId) {
  if (whichNews === 'all') {
    const news = newsDb.get('SELECT * FROM news', (err, news) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error' })
      }
    })

    return news
  }

  if (whichNews === 'one') {
    const news = newsDb.get(
      'SELECT * FROM news WHERE id = ?',
      [newsId],
      (err, news) => {
        if (err) {
          return res.status(500).send({ message: 'Internal server error' })
        }
      }
    )

    return news
  }
}

module.exports = getNews
