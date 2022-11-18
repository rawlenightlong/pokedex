//////////////
//Server Setup
//////////////
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const pokemon = require('./models/pokemon')




////////////
//Middleware
////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))


////////////
//Routes
////////////

//Index Route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemon: pokemon
    })
})
//New Route
app.get('/pokemon/new', (req, res) => {
    res.send(`Pokemon NEW Route`)
})
//Create Route
app.post('/pokemon', (req, res) => {
    res.send(`Pokemon Create Route`)
})
//Show Route
app.get('/pokemon/:id', (req, res) => {
    res.send(`Pokemon Show Route`)
})

//Destroy Route
app.delete('/pokemon/:id', (req, res) => {
    res.send(`Pokemon Delete Route`)
})

//Update Route
app.put('/pokemon:id', (req, res) => {
    res.send(`Pokemon Update Route`)
})
//Edit Route
app.get('/pokemon/:id/edit', (req, res) => {
    res.send(`Pokemon Edit Route`)
})

app.listen(PORT, () => {
    console.log(`Hey there Delilah, what's it like in Port ${PORT}`)
})