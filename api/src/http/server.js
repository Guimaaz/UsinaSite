const fastify = require('fastify')
const cors = require('@fastify/cors')
const fastifyCookie = require('@fastify/cookie')
const mongoose = require('mongoose')

// AUTH ROUTES
const signUp = require('./routes/auth/sign-up')
const login = require('./routes/auth/login')
const forgotPassword = require('./routes/auth/forgot-password')

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

// CART ROUTES
const getOrCreateCartRoute = require('./routes/cart/get-or-create-cart')
const addItemsToCartRoute = require('./routes/cart/add-items')
const clearCartRoute = require('./routes/cart/clear-cart')
const listCartItemsRoute = require('./routes/cart/list-items')
const removeItemFromCartRoute = require('./routes/cart/remove-item')

const env = require('../utils/env')

mongoose.connect(env.MONGO_URL)
const db = mongoose.connection

db.on('error', err => {
  console.log(err)
})

db.on('open', () => {
  console.log('[MONGOOSE] Connection estabilished')
})

const app = fastify()

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
  hook: 'onRequest',
})

app.register(cors, {
  origin: 'http://127.0.0.1:5500',
  credentials: true,
})

// AUTH ROUTES
app.register(signUp)
app.register(login)
app.register(forgotPassword)

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

app.register(getOrCreateCartRoute)
app.register(addItemsToCartRoute)
app.register(clearCartRoute)
app.register(listCartItemsRoute)
app.register(removeItemFromCartRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running at 3333')
  })
