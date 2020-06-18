const express = require('express')
var database = require('./database.json')
const app = express()
const port = 3000
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const uuid = require('uuid/v1')
// Middleware
app.use(morgan('tiny'))
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.static('public_html'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));



// CRUD API

// Create
app.post("/plants", (req, res) => {

    const plantsList = readJSONFile();
    req.body.id = uuid();

    if (req.files) {
        let img = req.files.img;
        img.mv("./public_html/img/" + img.name)
        req.body.img = "./img/" + img.name
    } else
        req.body.img = './img/placeholder.jpg';

    plantsList.push(req.body);
    writeJSONFile(plantsList);
    res.status(200)
    res.redirect("/index.html")

})


// Read One
app.get("/plants/:id", (req, res) => {

    const plantsList = readJSONFile();
    let found = 0;
    for (index in plantsList)
        if (plantsList[index].id == req.params.id) {
            res.send(plantsList[index])
            found = 1;
            break;
        }
    if (found == 0)
        res.status(404).send({ message: "Not found" })
})


// Read All
app.get("/plants", (req, res) => {

    res.send(readJSONFile())
})

// Update (all)
app.post("/plants/:id", (req, res) => {

    const plantsList = readJSONFile();
    console.log(req.body)
    for (let index = 0; index < plantsList.length; index++)
        if (plantsList[index].id == req.params.id) {
            old_img = plantsList[index].img;
            plantsList[index] = req.body
            if (req.files) {
                let img = req.files.img;
                img.mv("./public_html/img/" + img.name)
                plantsList[index].img = "./img/" + img.name
            } else
                plantsList[index].img = old_img;
            break
        }
    writeJSONFile(plantsList);
    res.status(200)
    res.redirect("/index.html")

})

//Update (id + key + value) 
app.put("/plants/:id/:key/:value", (req, res) => {

    console.log("hello")
    const plantsList = readJSONFile();

    for (let index = 0; index < plantsList.length; index++)
        if (plantsList[index].id == req.params.id) {
            plantsList[index][req.params.key] = req.params.value;
            break
        }
    writeJSONFile(plantsList);
    res.redirect('back')

})

// Delete
app.delete("/plants/:id", (req, res) => {
    const plantsList = readJSONFile();
    for (let index = 0; index < plantsList.length; index++)
        if (plantsList[index].id == req.params.id) {
            console.log("found")
            plantsList.splice(index, 1);
            break
        }
    writeJSONFile(plantsList);
    res.redirect('back')
})


function readJSONFile() {

    return JSON.parse(fs.readFileSync("database.json"))["plants"];
}

function writeJSONFile(content) {

    fs.writeFileSync("database.json",
        JSON.stringify({ plants: content }, null, '\t'),
        "utf-8",
        err => {
            if (err) {
                console.log(err)
            }
        });
}


app.listen(port, () => console.log(`Flora listening on port ${port}!`))
