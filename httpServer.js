
import {readFile} from 'node:fs/promises'
import http from 'node:http'

// let http = require('http')
// let fs = require('fs/promises')
let port = process.env.PORT || 3000


let server = http.createServer((req, res) => {
    if(req.method === 'GET'){ // only if get is called
        
        
        readFile('pets.json', 'utf-8').then((text) => {
            let pets = JSON.parse(text);
            
        if(req.url === '/pets'){ //&& url
            
            //parse the text
            res.statusCode = 200
            res.setHeader('Content-Type', 'aplication/json')
            
            res.end(text)
            
            
        }else if(req.url === '/pets/0'){
            let pet = pets[0];
            let petJ = JSON.stringify(pet)
            res.setHeader('Content-Type', 'aplication/json')
            res.statusCode = 200
            res.end(petJ)
            
        }else if(req.url === '/pets/1'){
            let pet = pets[1];
            let petJ = JSON.stringify(pet)

            res.setHeader('Content-Type', 'aplication/json')
            res.statusCode = 200
            res.end(petJ)

        }else if(req.url === '/pets/2') {
            

            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 404
            res.end('Not Found')

        }else if(req.url === '/pets/-1'){

            res.setHeader('Content-Type', 'Text/Plain')
            res.statusCode = 404
            res.end('Not Found')

        }else{
            console.log(404)
        }
    })
}

})

server.listen(port, ()=> {
    console.log('you have succesfully reached port: ', port)
    process.exit
})