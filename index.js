const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
// Middleware
app.use(morgan('tiny'))
app.use(cors());
app.use(bodyParser.json())
app.use(express.static('public_html'))
app.use(bodyParser.urlencoded({ extended: true }));

// CRUD API

// Create
app.post("/plants", (req, res)=> {

    const plantsList = readJSONFile();
    plantsList.push(req.newPlant); //TODO scrie functie pt asta
    writeJSONFile(plantsList)
})


// Read One
app.get("/plants/:id", (req, res) =>{

    const plantsList = readJSONFile();
    let found = 0;
    for (index in plantsList)
        if (plantsList[index].id 
            == req.params.id) {
            res.send(plantsList[index])
            found = 1;
            break;
        }
    if(found == 0 )
        res.status(404).send({message:"Not found"})
})


// Read All
app.get("/plants", (req,res) =>{

    res.send(readJSONFile())
})

// Update
app.post("/plants/:id", (req,res)=>{

    const plantsList = readJSONFile();
    console.log(req.body)
    for (let index=0;index<plantsList.length;index++)
        if(plantsList[index].id == req.params.id) {
            plantsList[index] = req.body
            break
        }
    writeJSONFile(plantsList);
    res.redirect("/index.html")
    
})

// Delete
app.delete("/plants/:id", (req,res) => {
    const plantsList = readJSONFile();
    for (let index=0;index<plantsList.length;index++)
        if(plant.id == req.params.id) {
            plantslist.splice(index,index);
            break
        }
        writeJSONFile(plantsList);   
})


function readJSONFile() {

    return JSON.parse(fs.readFileSync("database.json"))["plants"];
}

function writeJSONFile(content) {

    fs.writeFileSync("database.json",
    JSON.stringify({plants: content},null,'\t'),
    "utf-8",
    err => {
        if(err){
            console.log(err)
        }
    });
}


app.listen(port, () => console.log(`Flora listening on port ${port}!`))
