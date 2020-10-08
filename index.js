const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3100
const db = require('./queries')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Travel API. For more information: https://github.com/gsalibi/travel-information-api' })
})

app.get('/all', db.getCountries)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})