require('dotenv').config()

const fastify = require('fastify')
const cors = require('@fastify/cors')
const mongoose = require('mongoose')

// AUTH ROUTES
const signUp = require('./routes/user/sign-up')
const login = require('./routes/user/login')

// EVENTS ROUTES
const createEventRoute = require('./routes/events/create-event')
const getAllEventsRoute = require('./routes/events/get-all-events')
const getEventByIdRoute = require('./routes/events/get-event-by-id')
const deleteEventByIdRoute = require('./routes/events/delete-event-by-id')

// NEWS ROUTES
const createNewsRoute = require('./routes/news/create-news')
const deleteNewsByIdRoute = require('./routes/news/delete-news-by-id')
const getAllNewsRoute = require('./routes/news/get-all-news')

const getNewsByIdRoute = require('./routes/news/get-news-by-id')
const { client } = require('../db/client')

// const env = require('../env')

client
  .connect()
  .then(() => console.log('[MONGOOSE] Client connected sucessfully'))

const app = fastify()

app.register(cors, {
  origin: '*',
})

// AUTH ROUTES
app.register(signUp)
app.register(login)

// EVENTS ROUTES
app.register(createEventRoute)
app.register(deleteEventByIdRoute)
app.register(getAllEventsRoute)
app.register(getEventByIdRoute)

// NEWS ROUTES
app.register(createNewsRoute)
app.register(deleteNewsByIdRoute)
app.register(getAllNewsRoute)
app.register(getNewsByIdRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running at 3333')
  })
