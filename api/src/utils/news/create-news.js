function createNews(newsDb, { title, content, imageUrl }) {
  newsDb.run("INSERT INTO news (title, content, image) VALUES (?, ?, ?)", [title, content, imageUrl], (err) => {
    if (err) {
      return res.status(500).send({ message: "Error creating event" })
    }
    
    return res.status(201).send({ message: 'News created successfully' })
  })
}

module.exports = createNews