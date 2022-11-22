//////////////
//Server Setup
//////////////
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const pokemon = require('./models/pokemon')
const methodOverride = require('method-override')

console.log(pokemon[0].id)





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
    req.body.id = (pokemon.length + 1).toString()
    req.body.stats.hp = parseInt(req.body.stats.hp)
    req.body.stats.attack = parseInt(req.body.stats.attack)
    req.body.stats.defense = parseInt(req.body.stats.defense)
    let type = req.body.type
    let typeArray = (type.split(" "))
    if (typeArray.length > 1){
        typeArray[0] = (typeArray[0].substring(0, typeArray[0].length - 1))
        req.body.type = typeArray
}   console.log(req.body)
    pokemon.push(req.body)

    res.redirect('/pokemon')
})

//Update Route
app.put('/pokemon/:id', (req, res) => {
  
    req.body.stats.hp = parseInt(req.body.stats.hp)
    req.body.stats.attack = parseInt(req.body.stats.attack)
    req.body.stats.defense = parseInt(req.body.stats.defense)
    let type = req.body.type
    let typeArray = (type.split(" "))
    if (typeArray.length > 1){
        typeArray[0] = (typeArray[0].substring(0, typeArray[0].length - 1))
        req.body.type = typeArray
    console.log(req.body)
    pokemon[parseInt(req.params.id-1)].name = req.body.name
    pokemon[parseInt(req.params.id-1)].type = req.body.type
    pokemon[parseInt(req.params.id-1)].stats.hp = req.body.stats.hp
    pokemon[parseInt(req.params.id-1)].stats.attack = req.body.stats.attack
    pokemon[parseInt(req.params.id-1)].stats.defense = req.body.stats.defense

    res.redirect('/pokemon/')
}})


//Edit Route
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon,
        id: parseInt(req.params.id - 1)
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

//Show Route
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
    pokemon: pokemon,
    index: parseInt(req.params.id - 1),  
    })
})





app.listen(PORT, () => {
    console.log(`Hey there Delilah, what's it like in Port ${PORT}`)
})

console.log(pokemon[152])