
var btn = document.getElementById("myBtn")

var modalViewPlant = document.getElementById("viewPlant")
var span = document.getElementsByClassName("modal-close")[0];

var btnAddPlant = document.getElementById("btnAddPlant");
var modalAddPlant = document.getElementById("addPlant");


btn.onclick = function() {
    modalViewPlant.style.display = "block";
}

span.onclick = function() {
    modalViewPlant.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == this.modalViewPlant) {
        this.modalViewPlant.style.display = "none";
    }

}

function showAddModal() {
    modalAddPlant.style.display="block";

}

//todo add close