const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = String(process.env.MONGO_URL)

module.exports = {
  client: new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }),
}
