import express from 'express'

import {readFile, writeFile} from 'node:fs/promises'

let app = express(), port = process.env.PORT || 8000;

app.use(express.json())// parses json files
app.use(express.urlencoded())

app.get('/pets',(req, res) => {
    readFile('pets.json', 'utf-8').then((text) => {
        res.send(text)
    })
})

app.post('/pets', (req, res) => {
    readFile('pets.json', 'utf-8').then((text) => {
        let pets = JSON.parse(text)
        let pet = JSON.parse(req.body)
        pets = pets.push(pet)
        
        writeFile('pets.json', JSON.stringify(pets))
        // res.json(pet)
    })
})

app.listen(port, () => {
    console.log('live on the air')
})