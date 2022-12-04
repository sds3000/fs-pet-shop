import express from 'express'
import { read } from 'node:fs';
import {readFile, writeFile} from 'node:fs/promises'

let app = express();
let port = process.env.PORT || 3000;

app.use(express.json())

let checkAPIToken = (req, res, next)=>{

}

// GET method ===========================
app.get('/pets', (req, res) =>{

    readFile('./pets.json', 'utf-8').then((text) =>{
        let pets = JSON.parse(text)
        res.send(pets)
    }) 
    res.status(200)
    res.set('Content-Type', 'application/json')
})
app.get('/pets/:index', (req, res) =>{
    console.log('ready ready')
    let index = req.params.index;
    readFile('pets.json', 'utf-8').then((text)=> {
        let pets = JSON.parse(text)
        if(index <0 || index >= pets.length){
            console.log('not there')
        }else {
            let pet = pets[index];
            console.log(pet)
            res.send(pet)
        }
    })
    

})

// POST method ============================

app.post('/pets', (req, res) => {
    
    readFile('./pets.json', 'utf-8').then((text) => {
        pets = JSON.parse('pets.json')
        pets.push(pet)
        console.log(pets)
        writeFile('./pets.json',JSON.stringify(pets))
    })
    
    
})

//listener =====================

app.listen(port, (req, res) =>{
    console.log('successfully logged in the port')
})