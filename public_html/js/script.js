
var btn = document.getElementById("myBtn")

var modalViewPlant = document.getElementById("viewPlant")
var closeModal = document.getElementsByClassName("modal-close")[0];

var btnAddPlant = document.getElementById("btnAddPlant");
var modalAddPlant = document.getElementById("addPlant");
var closeAddModal = document.getElementsByClassName("modal-close")[1];


btn.onclick = function() {
    modalViewPlant.style.display = "block";
}

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

function showAddModal() {
    modalAddPlant.style.display="block";

}

//todo add close