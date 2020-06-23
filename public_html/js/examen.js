/* JavaScript pentru Examenul la TW */

/*************** Nivel 2, task 3 - 1p ****************/
{
    let titleNode = document.getElementById("headerTitle");
    let titleLength = titleNode.innerText.length;

    // pun span pt fiecare caracter
    let spanify = "";

    console.log([...titleNode.innerText]);

    [...titleNode.innerText].forEach(ch => {
        spanify += '<span class="ch">' + ch + "</span>";
    })

    titleNode.innerHTML = spanify;

    let letters = document.getElementsByClassName("ch")
    console.log(letters);
    [...letters].forEach(ltr => {
        ltr.style.opacity = "0";
    })

    // setez pointerii
    let i = 0, j = titleLength - 1;

    // interval animatie: 100ms
    let intervalAnimate = window.setInterval(animateTitle, 100);

    function animateTitle() {
        console.log("i:" + i + " j:" + j)

        if (i <= j) {
            letters[i].style.opacity = "1";
            letters[j].style.opacity = "1";
            i++;
            j--;
        }
        else {
            clearInterval(intervalAnimate)
            console.log("cleared!")
        }
    }
}
/**********Nivel 2, task 2 - aparitie treptata cuvant ************/
{
    let p1Node = document.getElementById("p1");
    let p2Node = document.getElementById("p2");

    p1Node.innerHTML = spanifyWords(p1Node, "word1");
    p2Node.innerHTML = spanifyWords(p2Node, "word2");

    let p1Words = document.getElementsByClassName("word1");
    let p2Words = document.getElementsByClassName("word2");

    // generez configuratia random. intai: vector de la 1 la lg paragraf
    let p1Order = []
    let p2Order = []

    for (let i = 0; i < p1Words.length; i++)
        p1Order.push(i);
    for (let i = 0; i < p2Words.length; i++)
        p2Order.push(i);

    // random: nu f bun but does the job
    shuffle(p1Order)
    shuffle(p2Order)

    let y = 0
    let z = 0

    let animateW = window.setInterval(animateWords, 333);
    function animateWords() {
        let modified = 0
        if (y < p1Words.length) {
            modified = 1
            p1Words[p1Order[y]].style.opacity = 1;
            y++;
        }
        if (z < p2Words.length) {
            modified = 1
            p2Words[p2Order[z]].style.opacity = 1;
            z++;
        }
        if (modified == 0)
            clearInterval(animateW)

    }


    function shuffle(array) {
        for (let ii = array.length - 1; ii > 0; ii--) {
            let jj = Math.floor(Math.random() * (ii + 1));
            let temp = array[ii];
            array[ii] = array[jj];
            array[jj] = temp;
        }
    }

    function spanifyWords(nod, tag) {
        // functie care pune span pentru fiecare cuvant
        let spanned = ""
        nod.innerText.split(" ").forEach(word => {
            spanned += '<span class="' + tag + '" style="opacity:0">' + word + ' </span>';
        })
        return spanned;
    }
}


/*************************/
var menu = document.getElementById("menu")
var menuItems = document.getElementsByClassName("menu-item");
menuItems[3].addEventListener('click', backToTop);
// variabila care va avea valoarea id-ului cardului 
//peste care se afla mouse-ul (sau null daca nu e pe niciunul)
var cardOnTop;
function backToTop() {
    document.documentElement.scrollTop = 0;
    menu.style.display = "none";

}
document.addEventListener('mousedown', e => {
    // arata meniul la click dreapta
    if (e.button == 2) {
        let x = e.clientX;
        let y = e.clientY;
        console.log(x + " " + y)
        let posx, posy;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX;
            posy = e.clientY;
        }
        menu.style.left = posx + "px";
        menu.style.top = posy + "px";

        //alege greyout sau nu
        if (cardOnTop != null) {
            menuItems[1].classList.remove('menu-item-disabled');
            menuItems[2].classList.remove('menu-item-disabled');

            var newE = menuItems[1].cloneNode(true);
            menuItems[1].parentNode.replaceChild(newE, menuItems[1]);
            menuItems[1].addEventListener('click', showViewModal.bind(this, cardOnTop));

            var newE = menuItems[2].cloneNode(true);
            menuItems[2].parentNode.replaceChild(newE, menuItems[2]);
            menuItems[2].addEventListener('click', deletePlant.bind(this, cardOnTop))
        }
        else {
            menuItems[1].classList.add('menu-item-disabled');
            menuItems[2].classList.add('menu-item-disabled');
        }
        menu.style.display = "block";

    }


    //ascunde meniul daca a fost afisat
    /* if (e.button == 0) {
        if (menu.style.display == "block")
            menu.style.display = "none";
    }*/
});