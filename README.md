# Flora 🌸 - examen TW
🌷 Plant management app 🌷

![main](https://i.imgur.com/ptBuHWu.png)

# Taskuri examen - total: 7.5p
 Cerinte nivel 1: 0.5p
 ---
#### 7. Ravase
La intrarea pe pagina, intr-o sectiune speciala se va afisa o prezicere aleatoare (dintr-un vector de siruri). De exemplu: "O sa treci toate examenele!", "O sa ai o vara frumoasa!", "O sa te ciupeasca un tantar!" etc.
#### 16. Salut, utilizator!
La intrarea pe pagina se va afisa un prompt cu intrebarea, "Cum te numesti?" Dupa ce utilizatorul raspunde, title-ul tab-ului se va schimba in "Salut, nume!", ramand astfel 2 secunde si apoi revenind la valoarea initiala.

#### 14. Prevenirea evenimentelor default
(Exemple: la click dreapta sa nu mai apara submeniul ci sa se petreaca alta actiune definita de student; la click pe un link sa nu se deschida (sau nu imediat ci facand verificari, de exemplu daca utilizatorul are drept de accesare a acelui link) , sa se dea alte semnificatii unor combinatii de taste aflate printre shortcuturile browserului precum ctr+s etc.

 Cerinte nivel 2: 1p
 ---
#### 2. Aparitie treptata cuvant
La intrarea pe pagina, sa existe minim 2 sectiuni cu text, in care textul apare cuvant cu cuvant intr-o "animatie" JavaScript (la fiecare treime de secunda apare cate un cuvant din text). 

#### 3. Aparitie treptata titlu
Sa se afiseze titlul paginii printr-o animatie, in felul urmator. La fiecare 100 milisecunde se fac vizibile doua litere ale titlului: intai prima si ultima, apoi a doua si penultima, apoi a treia si antepenultima, continuand pana in mijloc.


Cerinte nivel 3: 1.5p
 ---
#### 15. Meniu custom la click dreapta
Meniul ar fi simulat printr-un div cu butoane care apare la locul click-ului. Functionalitatea butoanelor este la alegerea studentului (de exemplu, un buton poate schimba culoarea textului, altul poate duce la inceputul paginii, altul poate sterge sectiunea curenta pe care s-a dat click etc). Trebuie sa existe minim 3 butoane in meniu.

 Cerinte nivel 5: 2.5p
 ---
#### 4. Logging
(memorarea intr-un fisier in format ales de studenti a actiunilor importante (in special de modificare a datelor din site) facute de utilizatori (trebuie minim 4 tipuri de actiuni: de exemplu vizualizare, adaugare, stergere, modificare). Intr-un camp al fisierului de log ar trebui memorate: numele utilizatorului, data si ora la care s-a petrecut actiunea, informatii despre actiune.
# Checklist laborator:

**Criterii de acceptanta:**

🌼 aplicatia sa fie [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) ✔️\
🌼 codul sursa (nearhivat) al proiectului trebuie sa fie salvat pe [GitHub](https://github.com/) ✔️\
🌼 nu puteti folosi librarii, framework-uri [CSS](https://en.wikipedia.org/wiki/CSS_framework) sau [JavaScript](https://en.wikipedia.org/wiki/JavaScript_framework) (cum ar fi jQuery, Bootstrap, Angular, React, etc) pentru realizarea frontend-ului ✔️

#### Frontend (maxim 17 puncte)

##### HTML si CSS (maxim 8 puncte)

🌼 Fisiere separate pentru HTML si CSS (0.5 puncte) 
```
/public_html/index.html
/public_html/css/style.css
```
🌼 In interiorul documentelor HTML, sa se foloseasca minim 4 [taguri semantice](https://www.w3schools.com/html/html5_semantic_elements.asp) (1 punct) 
```html
index.html

<nav>...</nav>
<header>...</header>
<main>...</main>
<section class="card">...</section>
<footer>...</footer>
```
🌼 Stilurile CSS sa fie definite folosind clase direct pe elementele care trebuie stilizate (minim 80% din selectori) (0.5 pct)✔️\
🌼 Layout-ul sa fie impartit in minim 2 coloane si sa fie realizat cu [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) si/sau [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/) (2 puncte)
```css
styles.css

.body-layout {
    height:100%;
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: 80px auto 50px;
    grid-template-areas:
    ". header ."
    ". main ."
    ". footer .";
}

```
🌼 Site-ul sa fie [responsive](https://www.w3schools.com/html/html_responsive.asp), respectand rezolutiile urmatoarelor dispozitive folosind [media queries](https://www.uxpin.com/studio/blog/media-queries-responsive-web-design/): (4 puncte)
```css
  ...
  /* Default style is Desktop */
  ...
  @media only screen and (min-width:768px) and (max-width: 1280px) { /* Tablets */ } 
  @media only screen and (max-width: 768px) { /* Mobile */ }

```
---
   > 🌷 telefon mobil - latime mai mica 768px 
   
   ![mobile](https://i.imgur.com/VcUnpU4.png)
   
---
   
   > 🌷 tableta - latime intre 768px si 1280px
   
   ![tablet](https://i.imgur.com/wJp04Sg.png)
  
---
   
   > 🌷 desktop - latime mai mare de 1280px 
   
   ![desktop](https://i.imgur.com/5cyheE8.png)
 
 ---

##### Javascript (maxim 9 puncte)

🌼 Fisier separat JavaScript (0.5 puncte) 
```
/public_html/js/script.js
```
🌼 Manipularea DOM-ului (crearea, editarea si stergerea elementelor/nodurilor HTML) (3 puncte) 
```js
script.js 

// cateva exemple
var waterBtn = document.createElement("div");
waterBtn.classList.add("water-btn");
waterBtn.addEventListener("click", waterPlant.bind(this, plant.id, plant.name));
waterBtn.id = "water_btn_" + plant.id;
cardRow.appendChild(waterBtn);
plantView.removeChild(plantView.lastChild);
```
🌼 Folosirea evenimentelor JavaScript declansate de mouse/tastatura (1 punct) 
```js
script.js

// functii care inchid modalele deschise
window.onclick = function (event) {
    if (event.target == this.modalViewPlant || event.target == this.modalAddPlant)
        this.closeModal();

}

window.onkeydown = function(event) {
    if ( event.keyCode == 27 ) { //ESC
        this.closeModal();
    }
}


```
🌼 Utilizarea [AJAX](https://www.w3schools.com/xml/ajax_intro.asp) ([GET, POST, PUT, DELETE](http://www.restapitutorial.com/lessons/httpmethods.html)) (4 puncte)
```js
script.js

// GET ALL
const res = fetch("/plants")
        .then((res) => res.json())
        .then((plants) => { ... }
   })
})

// GET ONE
const res = fetch("/plants/" + id)
        .then((res) => { return res.json() })
        .then((plant) => { ... }
})})

// PUT
const res = fetch("/plants/" + id + "/lastWatered/" + today, {
    method: 'PUT'
})
    .then(() => {
        alert(name + " marked as watered! 🌲❤️")
        window.location.reload()
})

// POST
<form method="POST" action="/plants" enctype="multipart/form-data">
    ... 
</form>

//DELETE
fetch("/plants/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(() => {window.location.reload()})

```
🌼 Folosirea localStorage (0.5 puncte)
```js
if (!localStorage.getItem("greeting") || localStorage.getItem("greeting") === "") {
        greeting.textContent = "Here are your plants:"
    }
    else greeting.textContent = localStorage.getItem("greeting");
}

function saveSettings(){
// ...
localStorage.setItem("greeting",document.getElementById("greeterTextbox").value)
}
```

#### Backend API (maxim 8 puncte)

🌼 Creare server Backend (2 puncte)
```js
index.js

const express = require('express')
...
```
🌼 CRUD API (Create, Read, Update si Delete) pentru a servi Frontend-ului (6 puncte)
```js
index.js

// Create
app.post("/plants", (req, res)=> { ... })

// Read One
app.get("/plants/:id", (req, res) =>{ ... })

// Read All
app.get("/plants", (req,res) =>{ ... })

// Update (key + value)
app.put("/plants/:id/:key/:value", (req,res)=>{ ... })

// Update (tot obiectul)
app.post("/plants/:id", (req, res) => { ... })

// Delete
app.delete("/plants/:id", (req,res) => { ... })

```
