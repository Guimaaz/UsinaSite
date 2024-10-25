const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
})

const News = mongoose.model('News', newsSchema)
module.exports = News
