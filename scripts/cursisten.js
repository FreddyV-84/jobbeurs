// -- Code van Joris --
// Ik tracht zoveel mogelijk code van commentaar te voorzien

let fotoI = 1; // globale variabele die huidig getoonde image(waarde) bevat (wordt aangepast in functies)

function Cursist() {
    this.naam;
    this.voornaam;
    this.eMail;
    this.img;
    
}

window.onload = function () {
    buildImages(10); // foto's toevoegen
    showImg(fotoI); // eerste foto in de rij moet getoond worden bij laden pagina
    currentImg(); // functie die via "onclick" op kleine foto's gebruiker laat kiezen
    hover(); //functie voor hover-effect op grote foto's
    buttons(); // functie die de knoppen bedient
}

function buildImages(aantal) { // dynamisch toevoegen van de grote en kleine foto's
    let groteBox = document.getElementById("cursisten-groteFotos");
    let kleineBox = document.getElementById("cursisten-kleineFotos");

    for (let index = 1; index <= aantal; index++) {
        let imgG = document.createElement("img");
        let imgK = document.createElement("img");

        imgK.src = "./img/cursisten/Dummy (" + index + ").jpg";
        imgG.src = "./img/cursisten/Dummy (" + index + ").jpg";
        imgK.className = "cursisten-Kfoto";
        imgG.className = "cursisten-Gfoto";
        kleineBox.appendChild(imgK);
        groteBox.appendChild(imgG);
    }
}

function hover() {
    let images = document.getElementsByClassName("cursisten-Gfoto"); //HTML-elementsList met images

    for (let index = 0; index < images.length; index++) { // overloop alle foto's in de lijst en doe daar iets mee (this verwijst naar elke foto apart)
        images[index].onmouseover = function () { // wijzig de foto (src van de foto) wanneer je er over gaat
            this.src = this.src.replace(/(.jpg)/, "b$1"); // zoek naar ".jpg" en zet daar net voor een "b"
        }

        images[index].onmouseout = function () { // wijzig de foto (src van de foto) wanneer je er af gaat
            this.src = this.src.replace(/b.jpg/, ".jpg"); // zoek naar een b net voor de ".jpg" en haal deze weg
        }
    }
}

function currentImg(i) {
    let images = document.getElementsByClassName("cursisten-Kfoto");

    for (let i = 0; i < images.length; i++) {
        images[i].onclick = function () {
            showImg(fotoI = i + 1); // past de grote foto aan en schrijf geselecteerde foto weg in globale variable
        }
    }
}

function showImg(fotoIndex) { // toont de juiste foto (default: eerste foto) en past opacity van kleine foto's aan
    let i;
    let imagesG = document.getElementsByClassName("cursisten-Gfoto");
    let imagesK = document.getElementsByClassName("cursisten-Kfoto");

    if (fotoIndex > imagesG.length) { fotoI = 1 }
    if (fotoIndex < 1) { fotoI = imagesG.length }

    for (i = 0; i < imagesG.length; i++) {
        imagesG[i].style.display = "none";
        imagesK[i].style.opacity = "0.4";
    }

    imagesG[fotoI - 1].style.display = "block";
    imagesK[fotoI - 1].style.opacity = "1";
    changeInfo();
}

function buttons() { // knoppen (komen pas zichtbaar onder de 900px) functie: volgende en vorige
    let btnLeft = document.getElementById("button-left");
    let btnRight = document.getElementById("button-right");

    btnLeft.onclick = () => showImg(fotoI += -1);
    btnRight.onclick = () => showImg(fotoI += 1);
}

function changeInfo() { // toont dynamisch de juiste titel en tekst bij de juiste cursist
    document.getElementById("infoTitel").textContent = "Cursist " + fotoI;
    document.getElementById("infoTekst").textContent = fotoI + " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. " + fotoI
}