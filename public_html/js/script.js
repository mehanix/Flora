

var modalViewPlant = document.getElementById("viewPlant")

var btnAddPlant = document.getElementById("btnAddPlant");

var modalAddPlant = document.getElementById("addPlant");
var modalSettings = document.getElementById("modalSettings");
var plantView = document.getElementById("plant-view");
var cardAddPlant = document.getElementById("cardAddPlant")
var plants = [];
let form;

var localStorage = window.localStorage;
var greeting = document.getElementById("greeting")
function handleGreeting(event) {

    if (!localStorage.getItem("greeting") || localStorage.getItem("greeting") === "") {
        greeting.textContent = "Here are your plants:"
    }
    else greeting.textContent = localStorage.getItem("greeting");
}
window.onload = handleGreeting();

function saveSettings() {
    localStorage.setItem("greeting", document.getElementById("greeterTextbox").value)
    console.log(document.getElementById("greeterTextbox").value)
    window.location.reload()
}
// controls View Modal
function closeModal() {
    modalAddPlant.style.display = "none";
    modalViewPlant.style.display = "none";
    modalSettings.style.display = "none";
    document.body.style.position = "absolute";

}


window.onclick = function (event) {
    if (event.target == this.modalViewPlant || event.target == this.modalAddPlant)
        this.closeModal();

}

window.onkeydown = function(event) {
    if ( event.keyCode == 27 ) { //ESC
        this.closeModal();
    }
}


window.onload = getPlants()

//AJAX. get all plants
function getPlants() {

    const res = fetch("/plants")
        .then((res) => res.json())
        .then((plants) => {
            plants.forEach((plant) => {
                plantView.innerHTML += ` <section id="${plant.id}" class="card">
                            <div class="water-alert" id="alert_${plant.id}">
                                <p>🌧️ Needs watering! 🌧️</p>
                            </div>
                            <img src="${plant.img}" alt="Avatar"  onclick="showViewModal('${plant.id}')" style="width:100%">
                            <div class="card-row">
                                <div class="container">
                                    <h4><b>${plant.name}</b></h4>
                                    <p>${plant.desc}</p>
                                </div>
                                <div class="water-btn" onclick="waterPlant('${plant.id}','${plant.name}')" id="water_btn_${plant.id}">
                                    <div class="water-btn-wrapper">
                                        <i class="fas fa-tint"></i> 
                                        <p class="helper-text">Watered!</p>  
                                    </div>
                                </div>
                            </div>
                            </section>`;
                //check if water due today
                if (isWaterDue(plant.waterEvery, plant.lastWatered)) {
                    document.getElementById("alert_" + plant.id).style.display = "block";
                    document.getElementById("water_btn_" + plant.id).style.display = "block";
                }
            })
        })
}

function waterPlant(id, name) {

    console.log(id);
    let today = new Date().toISOString().split('T')[0]
    const res = fetch("/plants/" + id + "/lastWatered/" + today, {
        method: 'PUT'
    })
        .then(() => {
            alert(name + " marked as watered! 🌲❤️")
            window.location.reload()
        })

}

function isWaterDue(waterEvery, lastWatered) {
    let today = new Date();
    let last = new Date(lastWatered)
    console.log(today, lastWatered)
    let timeBetween = today.getTime() - last.getTime();
    let daysBetween = timeBetween / (1000 * 3600 * 24);
    if (daysBetween >= waterEvery)
        return true;
    return false;

}

function showAddModal() {
    document.body.style.position = "fixed";
    modalAddPlant.style.display = "block";


}
/*
function showEditControls(plant) {
    modalViewPlant.innerHTML = ` <div class="modal-content">
    <div class="modal-plant-img">
        <img src="${plant.img}">
    </div>
    <div class="modal-plant-info">
        <form id="updateForm" enctype="multipart/form-data" action="/plants/${plant.id}">
            <label for="plant-name">Plant Name:</label>
            <input id="plant-name"  name="name" type="text" value="${plant.name}"><br>
            <input type="hidden" name="id" value="${plant.id}">
            <p>Water every <input name="waterEvery" id="waterEvery" type="number" min="1" max="100" value="${plant.waterEvery}"> days</p>
            <label for="plantImage">Image: </label>
            <input id="plantImage" name="img" type='file'>
            <p>Date last watered: <input name="lastWatered" type="date" id="lastWatered" name="lastWatered" value="${plant.lastWatered}"> </p>
            <label for="plant-desc">Plant Description:</label>
            <textarea  name="desc" id="plant-desc">${plant.desc}</textarea>
            <br><br>
            <button type="submit" class="modal-save-btn">
                <i class="fa fa-save"></i> Save
            </button>
        </form>
    </div>
    <span onclick='closeModal()' class="modal-close"><i class="fas fa-times"></i></span>
    <div class="modal-controls">
            <div class="modal-button-edit">
                <i class="fas fa-edit"></i>
            </div>
            <div onclick="deletePlant('${plant.id}')" class="modal-button-delete">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
</div>`
    //  et form
    form = document.getElementById("updateForm")

    function updatePlant() {
        //parse form data
        const FD = new FormData(form);
        let data = {};
        for (var pair of FD.entries()) {
            data[pair[0]] = pair[1]
            console.log(pair[0],pair[1])
        }
        data["img"] = FD.get("img")
        console.log(data)
        //return promise
        return fetch("/plants/" + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }


    form.addEventListener("submit", function (event) {
        event.preventDefault();
        //refresh page
        updatePlant().then(() => {
            console.log("done");
            window.location.reload()
        })
    });



}*/


function showEditControls(plant) {
    modalViewPlant.innerHTML = ` <div class="modal-content">
    <div class="modal-plant-img">
        <img src="${plant.img}">
    </div>
    <div class="modal-plant-info">
        <form  method="POST" enctype="multipart/form-data" action="/plants/${plant.id}">
            <label for="plant-name">Plant Name:</label>
            <input id="plant-name"  name="name" type="text" value="${plant.name}"><br>
            <input type="hidden" name="id" value="${plant.id}">
            <p>Water every <input name="waterEvery" id="waterEvery" type="number" min="1" max="100" value="${plant.waterEvery}"> days</p>
            <label for="plantImage">Image: </label>
            <input id="plantImage" name="img" type='file'>
            <p>Date last watered: <input name="lastWatered" type="date" id="lastWatered" name="lastWatered" value="${plant.lastWatered}"> </p>
            <label for="plant-desc">Plant Description:</label>
            <textarea  name="desc" id="plant-desc">${plant.desc}</textarea>
            <br><br>
            <button type="submit" class="modal-save-btn">
                <i class="fa fa-save"></i> Save
            </button>
        </form>
    </div>
    <span class="modal-close">&times;</span>
    <div class="modal-controls">
            <div class="modal-button-edit">
                <i class="fas fa-edit"></i>
            </div>
            <div class="modal-button-delete">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
</div>`


}

function showViewModal(id) {
    document.body.style.position = "fixed";
    modalViewPlant.innerHTML = "";
    const res = fetch("/plants/" + id)
        .then((res) => { return res.json() })
        .then((plant) => {
            modalViewPlant.innerHTML = ` <div class="modal-content">
            <div class="modal-plant-img">
                <img src="${plant.img}">
            </div>
            <div class="modal-plant-info">
                <h1>${plant.name}</h1>
                <p> Water every ${plant.waterEvery} days </p>
                <p>Date last watered: ${plant.lastWatered}</p>
            </div>
            <span onclick='closeModal()' class="modal-close"><i class="fas fa-times"></i></span>
    
            <div class="modal-controls">
                <div class="modal-button-edit" onclick='showEditControls(${JSON.stringify(plant)})'>
                    <i class="fas fa-edit"></i>
                </div>
                <div onclick="deletePlant('${plant.id}')" class="modal-button-delete">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
            `

        })
    modalViewPlant.style.display = "block";

}

function deletePlant(id) {
    console.log('cleck', id)
    fetch("/plants/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => { window.location.reload() })
}

function openSettings() {
    modalSettings.style.display = "block";
    document.body.style.position = "fixed";
}