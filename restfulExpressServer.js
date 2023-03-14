import express from 'express'
import {readFile, writeFile} from 'node:fs/promises'
import morgan from 'morgan'
import postgres from 'postgres'

let app = express();
let port = process.env.PORT || 4000;

// connects to petshop database
let sql = postgres({database: 'petshop'})


app.use(express.json())
//morgan stuff
morgan('tiny')

//checks API (not needed)
// let checkAPIToken = (req, res, next)=>{}

// GET method ===========================
app.get('/pets', (req, res) =>{
    sql`SELECT * FROM pets`.then((pets) => {
        console.log('pets', pets)
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.json(pets)

    })
    
    res.status(200)
    res.set('Content-Type', 'application/json')
})
app.get('/pets/:id', (req, res) =>{
    console.log('ready ready')
    // search database by url query
    // let q = req.params
    // sql`SELECT * FROM pets WHERE id = ${q}`.then(results => {

    // })

    // search database by path id 
    let id = req.params.id
    sql`SELECT * FROM pets WHERE id = ${id}`.then(result => {
        if(result.length === 0){
            res.status(404)
            res.send('not there')
        }else{
            res.json(result)
        }
    })

    // 
    // readFile('pets.json', 'utf-8').then((text)=> {
    //     let pets = JSON.parse(text)
    //     if(index <0 || index >= pets.length){
    //         console.log('not there')
    //     }else {
    //         let pet = pets[index];
    //         console.log(pet)
    //         res.send(pet)
    //     }
    // })
    

})

// POST method ============================

app.post('/pets', (req, res) => {
    
    // database
    // sql`SELECT * FROM pets`.then(result =>{
        let pet = req.body
        let {age, name, kind} = pet
        
        sql`INSERT INTO pets (age, name, kind) VALUES(${age}, ${name}, ${kind}) RETURNING *`.then(
            (result) => {
            res.json(result)
        })
        
    

    // json file
    // readFile('./pets.json', 'utf-8').then((text) => {
    //     let pets = JSON.parse(text)
    //     let pet = req.body
    //     pets.push(pet)
    //     console.log(pets)
    //     writeFile('./pets.json',JSON.stringify(pets))
    // })
    
    
})

// Patch method =========================

app.patch('/pets/:index', async (req, res) => {
    
    let index = req.params.index
    let changes = req.body
    let text = await readFile('/pets', 'utf-8')

    const pets = JSON.parse(text);
    const existingPet = pets[index]
    for(let key in changes){
        existingPet[key] = changes[key]
    }
    res.status(200)
    res.set('Content-Type', 'application/json')
    await writeFile('./pets.json', JSON.stringify(pets))
    res.send(existingPet)
})

//listener =====================

app.listen(port, (req, res) =>{
    console.log('successfully logged in the port')
})