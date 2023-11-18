const express = require('express')
const urlRoute = require('./routes/url')
const redirectRoute = require("./routes/root");
const connectToMongoDB = require('./connectDB')
const app = express()
const PORT = 8001

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(
  console.log('MongoDB connected')
)
// MiddleWare Plugin
app.use(express.json())

app.use('/url', urlRoute)
app.use('/:shortId', redirectRoute)

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))
