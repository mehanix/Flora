

var modalViewPlant = document.getElementById("viewPlant")
var closeModal = document.getElementsByClassName("modal-close")[0];

var btnAddPlant = document.getElementById("btnAddPlant");

var modalAddPlant = document.getElementById("addPlant");
var closeAddModal = document.getElementsByClassName("modal-close")[1];
var plantView = document.getElementById("plant-view");
var cardAddPlant = document.getElementById("cardAddPlant")
var plants = [];

closeModal.onclick = function() {
    modalViewPlant.style.display = "none";
}

closeAddModal.onclick = function() {
    modalAddPlant.style.display = "none";

}

window.onclick = function(event) {
    if (event.target == this.modalViewPlant || event.target == this.modalAddPlant) {
        this.modalViewPlant.style.display = "none";
    }

}


window.onload = getPlants()

//AJAX. get all plants
function getPlants(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","/plants",true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            plants = JSON.parse(this.responseText)
            plants.forEach((plant) => {
                plantView.innerHTML += ` <div id="${plant.id}" class="card" onclick="showViewModal(${plant.id})">
                    <img src="${plant.img}" alt="Avatar" style="width:100%">
                    <div class="container">
                        <h4><b>${plant.name}</b></h4>
                        <p>${plant.desc}</p>
                    </div>`;

            })
            
        }
}
}

function showAddModal() {
    modalAddPlant.style.display="block";


}

function showEditControls(plant) {
    modalViewPlant.innerHTML = ` <div class="modal-content">
    <div class="modal-plant-img">
        <img src="${plant.img}">
    </div>
    <div class="modal-plant-info">
        <form  method="POST" action="/plants/${plant.id}">
            <label for="plant-name">Plant Name:</label>
            <input id="plant-name"  name="name" type="text" value="${plant.name}"><br>
            <input type="hidden" name="id" value="${plant.id}">
            <p>Water every <input name="waterEvery" id="waterEvery" type="number" min="1" max="100" value="${plant.waterEvery}"> days</p>
            <label for="plantImage">Image Link: </label>
            <input id="plantImage"  name="img" type="text" value="${plant.img}"><br>
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
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","/plants/"+id,true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status == 200){
            var plant = JSON.parse(this.responseText)
            modalViewPlant.innerHTML = ` <div class="modal-content">
            <div class="modal-plant-img">
                <img src="${plant.img}">
            </div>
            <div class="modal-plant-info">
                <h1>${plant.name}</h1>
                <p> Water every ${plant.waterEvery} days </p>
                <p>Date last watered: ${plant.lastWatered}</p>
            </div>
            <span class="modal-close">&times;</span>
    
            <div class="modal-controls">
                <div class="modal-button-edit" onclick='showEditControls(${JSON.stringify(plant)})'>
                    <i class="fas fa-edit"></i>
                </div>
                <div class="modal-button-delete">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
            `
                }
    }
    modalViewPlant.style.display="block";

}

