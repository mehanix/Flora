/* JavaScript pentru Examenul la TW */

/*************** Nivel 2, task 3 - 1p ****************/

var titleNode = document.getElementById("headerTitle");
var titleLength = titleNode.innerText.length;

// pun span pt fiecare caracter
var spanify = "";

console.log([...titleNode.innerText]);

[...titleNode.innerText].forEach(ch => {
    spanify += "<span>" + ch + "</span>";
})

titleNode.innerHTML = spanify;

var letters = titleNode.getElementsByTagName("span")
console.log(letters);
[...letters].forEach(ltr => {
    ltr.style.opacity = "0";
})

// setez pointerii
var i = 0, j = titleLength - 1;

// interval animatie: 100ms
var intervalAnimate = window.setInterval((animateTitle), 100);

function animateTitle() {
    if (i <= j) {
        letters[i].style.opacity = "1";
        letters[j].style.opacity = "1";
        i++;
        j--;
        console.log("pac ")
    }
}

/**********Nivel 2, task 2 - aparitie treptata cuvant ************/

var p1Node = document.getElementById("p1");
var p2Node = document.getElementById("p2");

p1Node.innerHTML = spanifyWords(p1Node);
p2Node.innerHTML = spanifyWords(p2Node);

var p1Words = p1Node.getElementsByTagName("span");
var p2Words = p2Node.getElementsByTagName("span");

// generez configuratia random. intai: vector de la 1 la lg paragraf
var p1Order = []
var p2Order = []

for (var i = 0; i < p1Words.length; i++)
    p1Order.push(i);
for (var i = 0; i < p2Words.length; i++)
    p2Order.push(i);

// random: nu f bun but does the job
shuffle(p1Order)
shuffle(p2Order)

var y = 0
var z = 0

var animateW = window.setInterval(animateWords, 333);
function animateWords() {
    if (y < p1Words.length) {
        p1Words[p1Order[y]].style.opacity = 1;
        y++;
    }
    if (z < p2Words.length) {
        p2Words[p2Order[z]].style.opacity = 1;
        z++;
    }

}


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function spanifyWords(nod) {
    // functie care pune span pentru fiecare cuvant
    var spanned = ""
    nod.innerText.split(" ").forEach(word => {
        spanned += '<span style="opacity:0">' + word + ' </span>';
    })
    return spanned;
}



