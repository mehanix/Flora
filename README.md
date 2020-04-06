# Flora 🌸
🌷 Plant management app 🌷

![plants](https://i.imgur.com/SoXFVaw.png)

# Checklist:

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
<footer>...</footer>
```
🌼 Stilurile CSS sa fie definite folosind clase direct pe elementele care trebuie stilizate (minim 80% din selectori) (0.5 punct) ✔️\
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
var modalViewPlant = document.getElementById("viewPlant");

modalViewPlant.style.display = "block";

modalViewPlant.innerHTML = ` ... `;

```
🌼 Folosirea evenimentelor JavaScript declansate de mouse/tastatura (1 punct) 
```js
script.js

// functii care inchid modalele deschise
window.onclick = function(event) {
    if (event.target == this.modalViewPlant || event.target == this.modalAddPlant) {
        this.modalViewPlant.style.display = "none";
        this.modalAddPlant.style.display = "none"
    }
}

window.onkeydown = function(event) {
    if ( event.keyCode == 27 ) { //ESC
        this.modalViewPlant.style.display = "none";
        this.modalAddPlant.style.display = "none";
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
function updatePlant() {
    // ... //
    return fetch("/plants/" + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
})}

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
⌛ Folosirea localStorage (0.5 puncte)
```
//Coming soon!
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

// Update
app.put("/plants/:id", (req,res)=>{ ... })

// Delete
app.delete("/plants/:id", (req,res) => { ... })

```
