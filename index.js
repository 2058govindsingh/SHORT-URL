const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/root')
const userRoute = require('./routes/user')

const { checkForAuthentication, restrictTo } = require('./middlewares/auth')

const connectToMongoDB = require('./connectDB')

const URL = require('./models/url')

const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(
  console.log('MongoDB connected')
)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// MiddleWare Plugin
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))
