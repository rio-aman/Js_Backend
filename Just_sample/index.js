require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/twitter', (req,res) => {
    res.send("Aman Prajapati")
})
app.get('/login', (req,res) => {
    res.send("<h1>please login in app</h1>")
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})

// if we want to get this exact app with port then we need to use dotenv 

// well above is a basic server
//  slash / this is must in app.get 

