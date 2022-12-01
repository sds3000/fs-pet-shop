import {readFile, writeFile} from 'fs/promises'

//variable for argument in [2] index area
let subcommand = process.argv[2]
let index = process.argv[3]

//for read command
if( subcommand === 'read'){
    //read the pets.json
    readFile('./pets.json', 'utf-8').then((text) => {
        //parse text file
        let pets = JSON.parse(text)
        // checks to see if within the range of entries
        if(index > pets.length || index < 0) {
            console.error('Usage: node pets.js read INDEX')
            // return indexed element
        }else {
            console.log(pets[index])
        }
    })
}else if(subcommand === 'create'){
    let age = process.argv[3],
    kind = process.argv[4],
    name = process.argv[5],
    pet = {'age': age, 'kind': kind, 'name': name };

    if(age === undefined || kind === undefined || name === undefined){
        console.error('Usage: node pets.js create AGE KIND NAME')
    }else{
        readFile('./pets.json', 'utf-8').then((text) => {

            let pets = JSON.parse(text)

            pets.push(pet);

            let newText = JSON.stringify(pets)

            console.log('success!')
            
            writeFile('./pets.json', newText)
        })
    }


}else{
    console.error('Usage: node pets.js [read | create | update | destroy]')
    process.exit
}