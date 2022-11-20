//////////////
//Server Setup
//////////////
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const pokemon = require('./models/pokemon')
const methodOverride = require('method-override')
const { type } = require('os')
// console.log(pokemon[3].type)





////////////
//Middleware
////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use('/static', express.static('public'))

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
    res.render('new.ejs')
})
//Create Route
app.post('/pokemon', (req, res) => {
    req.body.stats.hp = parseInt(req.body.stats.hp)
    req.body.stats.attack = parseInt(req.body.stats.attack)
    req.body.stats.defense = parseInt(req.body.stats.defense)
    let type = req.body.type
    console.log(type)
    let typeArray = (type.split(" "))
    console.log(typeArray)
    if (typeArray.length > 1){
        typeArray[0] = (typeArray[0].substring(0, typeArray[0].length - 1))
        req.body.type = typeArray
        console.log(req.body)
}
    // console.log(req.body)
    pokemon.unshift(req.body)
    res.redirect('/pokemon')
})

//Update Route
app.put('/pokemon:id', (req, res) => {
    res.send(`Pokemon Update Route`)
})
//Edit Route
app.get('/pokemon/:id/edit', (req, res) => {
    res.send(`Pokemon Edit Route`)
})



//Show Route
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
    pokemon: pokemon,
    index: parseInt(req.params.id - 1),  
    })
})

//Destroy Route
app.delete('/pokemon/:id', (req, res) => {
    id = req.params.id
     for (let i = 0; i < pokemon.length; i++){
         if (pokemon[i].id === id){
                pokemon.splice(i, 1)
        }
    }
    res.redirect('/pokemon')
})



app.listen(PORT, () => {
    console.log(`Hey there Delilah, what's it like in Port ${PORT}`)
})