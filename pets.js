//Usage: node pets.js [read | create | update | destroy]
import { readFile, writeFile } from 'fs/promises'

let subcommand = process.argv[2];

if(subcommand === 'read'){
    const petIndex = process.argv[3];
    readFile('./pets.json', 'utf-8').then((text) => {
        const pets = JSON.parse(text);
        if(petIndex === undefined){
            console.log(pets)
        }else if(petIndex >= pets.length || petIndex < 0){
            console.error('Usage: node pets.js read INDEX')
        }else{
            console.log(pets[petIndex])
        }
    })
    
}else if(subcommand === 'create'){

    let age = process.argv[3],
     kind = process.argv[4], 
     name = process.argv[5],
     pet = {'age': parseInt(age), 'kind': kind, 'name': name};

    if(age === undefined || kind === undefined || name === undefined){// if one of the fields are not filled, logs error
        console.error('Usage: node pets.js create AGE KIND NAME')

    } else {// read json file
        readFile('./pets.json', 'utf-8').then( (text) =>{
            // parse the text
            let pets = JSON.parse(text)
            //push the new pet entry to pets
            pets.push(pet)
            // convert back to JSON file
            let newText = JSON.stringify(pets)
            //create the new file
            console.log('you were successful')
            return writeFile('./pets.json', newText)

        })
        
    }

    
    
}else if(subcommand === 'update'){
    let age = process.argv[4],
     kind = process.argv[5], 
     name = process.argv[6],
     pet = {'age': parseInt(age), 'kind': kind, 'name': name},
     index = process.argv[3];
     readFile('./pets.json', 'utf-8').then((text) => {
        let pets = JSON.parse(text)
        pets[index] = pet
        let newText = JSON.stringify(pets)

        return writeFile('./pets.json', newText)
     })

}else if (subcommand === 'destroy'){

}else{
    console.error("Usage: node pets.js [read|create|update|destroy]")
    process.exit(1)
}

// writeFile('./pets.json', `{age: ${process.argv[3]}, kind: ${process.argv[4]}, name: ${process.argv[5]}}`).then( (text)=> {
//     const pets = JSON.parse(text)

//     console.log('written succesfully')
// })