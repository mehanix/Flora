var modalViewPlant;

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
    modalViewPlant.remove();
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
function showEditControls(plantJSON) {
    modalViewPlant.innerHTML = "";
    var plant = JSON.parse(plantJSON);
    var modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalViewPlant.appendChild(modalContent);

    var modalPlantImg = document.createElement("div");
    modalPlantImg.classList.add("modal-plant-img");
    modalContent.appendChild(modalPlantImg);

    var img = document.createElement("img");
    img.src = plant.img;
    modalPlantImg.appendChild(img);

    var modalPlantInfo = document.createElement("div");
    modalPlantInfo.classList.add("modal-plant-info");
    modalContent.appendChild(modalPlantInfo);

    var form = document.createElement("form")
    form.enctype = "multipart/form-data";
    form.action = "/plants/" + plant.id;
    form.method = "POST";

    var label1 = document.createElement("label");
    label1.htmlFor = "plant-name"
    label1.textContent = "Plant Name:"
    form.appendChild(label1);

    var input1 = document.createElement("input");
    input1.type = "text";
    input1.name = "name";
    input1.value = plant.name;
    form.appendChild(input1);

    var inputH = document.createElement("input");
    inputH.type = "hidden";
    inputH.name = "id";
    inputH.value = plant.id;
    form.appendChild(inputH);

    var p = document.createElement("p");
    var t1 = document.createTextNode("Water every ");
    p.appendChild(t1);
    var inputE = document.createElement("input");
    inputE.name = "waterEvery";
    inputE.id = "waterEvery";
    inputE.type = "number";
    inputE.min = "1";
    inputE.max = "100";
    inputE.value = plant.waterEvery;
    p.appendChild(inputE);

    var t2 = document.createTextNode(" days");
    p.appendChild(t2);
    form.appendChild(p);



    var label5 = document.createElement("label");
    label5.htmlFor = "plantImage"
    label1.textContent = "Plant Image:"
    form.appendChild(label5);

    var input5 = document.createElement("input");
    input5.type = "file";
    input5.name = "img";
    form.appendChild(input5);


    var p2 = document.createElement("p");
    p2.innerText = "Date last watered: "

    var input6 = document.createElement("input");
    input6.type = "date";
    input6.name = "lastWatered";
    input6.id = "lastWatered";
    input6.value = plant.lastWatered;

    p2.appendChild(input6);
    form.appendChild(p2);



    var label3 = document.createElement("label");
    label3.htmlFor = "plant-desc"
    label3.textContent = "Plant Description:"
    form.appendChild(label3);

    var textarea = document.createElement("textarea");
    textarea.name = "desc"
    textarea.id = "plant-desc";
    textarea.textContent = plant.desc;
    form.appendChild(textarea);

    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    form.appendChild(br1);
    form.appendChild(br2);

    var btn = document.createElement("button");
    btn.type = "submit";
    btn.classList.add("modal-save-btn");
    form.appendChild(btn);

    var ii = document.createElement("i");
    ii.classList.add("fa", "fa-save");
    var t4 = document.createTextNode(" Save");
    btn.appendChild(ii);
    btn.appendChild(t4);

    var modalControls = document.createElement("div");
    modalControls.classList.add("modal-controls");
    modalContent.appendChild(modalControls);

    var modalButtonEdit = document.createElement("div");
    modalButtonEdit.classList.add("grey", "modal-button-edit");
    modalControls.appendChild(modalButtonEdit);

    var i2 = document.createElement("i");
    i2.classList.add("fas", "fa-edit");
    modalButtonEdit.appendChild(i2);



    var modalButtonDelete = document.createElement("div");
    modalButtonDelete.classList.add("grey-dark", "modal-button-delete");

    modalControls.appendChild(modalButtonDelete);

    var i3 = document.createElement("i");
    i3.classList.add("fas", "fa-trash-alt");
    modalButtonDelete.appendChild(i3);


    var modalButtonClose = document.createElement("div");
    modalButtonClose.classList.add("modal-button-exit");
    modalButtonClose.addEventListener("click", closeModal);

    modalControls.appendChild(modalButtonClose);

    var i4 = document.createElement("i");
    i4.classList.add("fas", "fa-times");
    modalButtonClose.appendChild(i4);
    modalPlantInfo.appendChild(form);


}

function showViewModal(id) {
    document.body.style.position = "fixed";
    const res = fetch("/plants/" + id)
        .then((res) => { return res.json() })
        .then((plant) => {
            modalViewPlant = document.createElement("div");
            modalViewPlant.id = "viewPlant";
            modalViewPlant.classList.add("modal-view-plant");

            var modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");
            modalViewPlant.appendChild(modalContent);

            var modalPlantImg = document.createElement("div");
            modalPlantImg.classList.add("modal-plant-img");
            modalContent.appendChild(modalPlantImg);

            var img = document.createElement("img");
            img.src = plant.img;
            modalPlantImg.appendChild(img);

            var modalPlantInfo = document.createElement("div");
            modalPlantInfo.classList.add("modal-plant-info");
            modalContent.appendChild(modalPlantInfo);

            var h1 = document.createElement("h1");
            h1.textContent = plant.name;
            modalPlantInfo.appendChild(h1);

            var p1 = document.createElement("p");
            p1.textContent = "Water every " + plant.waterEvery + " days";
            modalPlantInfo.appendChild(p1);

            var p2 = document.createElement("p");
            p2.textContent = "Date last watered: " + plant.lastWatered;
            modalPlantInfo.appendChild(p2);


            var modalControls = document.createElement("div")
            modalControls.classList.add("modal-controls");
            modalContent.appendChild(modalControls);

            var modalControls = document.createElement("div");
            modalControls.classList.add("modal-controls");
            modalContent.appendChild(modalControls);

            var modalButtonEdit = document.createElement("div");
            modalButtonEdit.classList.add("modal-button-edit");
            modalButtonEdit.addEventListener("click", showEditControls.bind(this, JSON.stringify(plant)));
            modalControls.appendChild(modalButtonEdit);

            var i2 = document.createElement("i");
            i2.classList.add("fas", "fa-edit");
            modalButtonEdit.appendChild(i2);

            var modalButtonDelete = document.createElement("div");
            modalButtonDelete.classList.add("modal-button-delete");
            modalButtonDelete.addEventListener("click", deletePlant.bind(this, plant.id));

            modalControls.appendChild(modalButtonDelete);

            var i3 = document.createElement("i");
            i3.classList.add("fas", "fa-trash-alt");
            modalButtonDelete.appendChild(i3);

            var modalButtonClose = document.createElement("div");
            modalButtonClose.classList.add("modal-button-exit");
            modalButtonClose.addEventListener("click", closeModal);

            modalControls.appendChild(modalButtonClose);

            var i4 = document.createElement("i");
            i4.classList.add("fas", "fa-times");
            modalButtonClose.appendChild(i4);


            document.body.appendChild(modalViewPlant);
            modalViewPlant.style.display = "block";
        })

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