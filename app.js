const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const cors = require('cors')

require('dotenv/config')

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.options('*', cors())

const api = process.env.API_URL

const Product = require('./models/product')

//routes
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const userRoute = require('./routes/user')

//api
app.use(`${api}/categories`, categoryRoute)
app.use(`${api}/categories/:id`, categoryRoute)
app.use(`${api}/products`, productRoute)
app.use(`${api}/products/:id`, productRoute)
app.use(`${api}/users`, userRoute)
app.use(`${api}/users/:id`, userRoute)
app.use(`${api}/orders`, orderRoute)
app.use(`${api}/orders/:id`, orderRoute)


app.get("", (req, res) => {
    res.send('Hello world, This is my first backend project')
})

//connect database
mongoose.connect(process.env.atlas_string, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName: 'eshop'
}).then(() =>{
    app.listen(3000, () => {
        console.log('database connected')
        console.log('first backend http://localhost:3000/')
    })
}).catch((err) => {
    console.log(err.message)
})
