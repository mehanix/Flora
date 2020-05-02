

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

window.onkeydown = function (event) {
    if (event.keyCode == 27) { //ESC
        this.closeModal();
    }
}

function drawPlant(plant, parent) {
    var section = document.createElement("section");
    section.id = plant.id;
    section.classList.add("card");
    parent.appendChild(section);

    var waterAlert = document.createElement("div");
    waterAlert.classList.add("water-alert");
    waterAlert.id = "alert_" + plant.id;
    section.appendChild(waterAlert);

    var waterAlertP = document.createElement("p");
    var waterAlertText = document.createTextNode("🌧️ Needs watering! 🌧️");
    waterAlertP.appendChild(waterAlertText);
    waterAlert.appendChild(waterAlertP);

    var img = document.createElement("img");
    img.src = plant.img;
    img.alt = "Plant image";
    img.addEventListener("click", showViewModal.bind(this, plant.id));
    img.style.width = "100%";
    section.appendChild(img);

    var cardRow = document.createElement("div");
    cardRow.classList.add("card-row");
    section.appendChild(cardRow);

    var container = document.createElement("div");
    container.classList.add("container");
    cardRow.appendChild(container);

    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode(plant.name);
    var bold = document.createElement("b");
    bold.appendChild(h4Text);
    h4.appendChild(bold);
    container.appendChild(h4);

    var p = document.createElement("p");
    var pText = document.createTextNode(plant.desc);
    p.appendChild(pText);
    container.appendChild(p);

    var waterBtn = document.createElement("div");
    waterBtn.classList.add("water-btn");
    waterBtn.addEventListener("click", waterPlant.bind(this, plant.id, plant.name));
    waterBtn.id = "water_btn_" + plant.id;
    cardRow.appendChild(waterBtn);

    waterBtnWrapper = document.createElement("div");
    waterBtn.appendChild(waterBtnWrapper);
    waterBtnWrapper.classList.add("water-btn-wrapper");

    var icon = document.createElement("i");
    icon.classList.add("fas", "fa-tint");
    waterBtnWrapper.appendChild(icon);

    var helperTextP = document.createElement("p");
    var helperText = document.createTextNode("Mark as watered");
    helperTextP.classList.add("helper-text");
    helperTextP.appendChild(helperText);
    waterBtnWrapper.appendChild(helperTextP);

    if (isWaterDue(plant.waterEvery, plant.lastWatered)) {
        waterBtn.style.display = "block";
        waterAlert.style.display = "block";

    }


}

window.onload = getPlants()

//AJAX. get all plants
function getPlants() {

    const res = fetch("/plants")
        .then((res) => res.json())
        .then((plants) => {
            plants.forEach((plant) => {
                drawPlant(plant, plantView);
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
    <span onclick='closeModal()' class="modal-close"><i class="fas fa-times"></i></span>
    <div class="modal-controls">
            <div class="grey modal-button-edit">
                <i class="fas fa-edit"></i>
            </div>
            <div class="grey-dark modal-button-delete">
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