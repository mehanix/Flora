const express = require('express')
var cors = require('cors')
var database = require('./database.json')
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.set('view engine', 'pug')
app.get('/', (req,res) => {

    res.render('index',{plants:database.plants})
})


app.listen(port, () => console.log(`Flora listening on port ${port}!`))
