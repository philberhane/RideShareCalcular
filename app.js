const dotenv = require('dotenv').config();
const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')




let app = express()


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())

app.post('/registerStripe', routes.registerStripe)
app.post('/sendEmailPayPal', routes.sendEmailPayPal)



app.listen(process.env.PORT || 3000)