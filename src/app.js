const express = require('express')
const cors = require('cors');
const path = require('path');
const userRouter = require('./routers/user')
const itemRouter =require('./routers/item')
require('./db/mongoose')

const port = process.env.PORT || 8080

const app = express()
app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(itemRouter)

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.listen(port, () => {
    console.log('server listening on port ' + port)
})