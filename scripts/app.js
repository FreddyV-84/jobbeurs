'use strict';

var headerHeight; // to offset menu header
let fotoI = 1; // globale variabele die huidig getoonde image(waarde) bevat (wordt aangepast in functies)


window.onload = init;
window.onresize = function () {
    headerHeight = document.querySelector('#menu').offsetHeight;
}

function init() {
    headerHeight = document.querySelector('#menu').offsetHeight;

    document.querySelector('.navicon').onclick = toggleMenu;
    var links = document.querySelectorAll('.toggle__menu a');

    document.getElementById("btnInschr").onclick = function () {
        scrollTo(document.getElementById("section5").offsetTop - headerHeight);
    }

    for (let i = 0; i < links.length; i++) {
        links[i].onclick = (e) => {
            e.preventDefault();
            toggleMenu();
            scrollTo(document.getElementById("section" + (i + 1)).offsetTop - headerHeight);
        }
    }

    initSectionWelcome();
    initSectionStudents();
}

function initSectionWelcome() {
    maakCounter("2018-01-25", "12:30:00");
}

function initSectionStudents() {
    getXML();
}


/* MENU
-------------------------------------------------------------------------------------------- Menu */

function toggleMenu() {
    var navIcon = document.querySelector('.navicon'); // get handle on the navicon (a tag html element with class 'navicon')
    var toggle = document.querySelector('.toggle'); // get handle on the toggle (div tag with class 'toggle')

    navIcon.classList.toggle('navicon--active');
    toggle.classList.toggle('toggle--active');
}

function scrollTo(elementTop) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: (elementTop)
    });
}
/* _________________________________________________________________________________________ end Menu */



/* SECTION WELCOME
-------------------------------------------------------------------------------------------- Section Welcome */
function maakCounter(d, t) {
    var tijd = Date.parse(d + "T" + t)
    counter.innerHTML = "<div id='dag'></div><div id='uur'></div><div id='min'></div><div id='sec'></div>";
    var blok = 4;
    setInterval(zetCounter, 1000);

    function zetCounter() {
        var t = tijd - Date.now();
        if (blok > 3) {
            var d = Math.floor(t / (3600000 * 24));
            if (d < 1) {
                dag.style.display = "none";
                blok = 3;
            }
            dag.innerHTML = "<div class='tg'>" + d + "</div><div class='tt'>" + (d == 0 ? '&nbsp' : d == 1 ? 'dag' : 'dagen') + "</div>";
        }
        if (blok > 2) {
            var u = (Math.floor(t / 3600000)) % 24;
            if (u < 1 && blok == 3) {
                uur.style.display = "none";
                blok = 2;
            }
            uur.innerHTML = "<div class='tg'>" + u + "</div><div class='tt'>" + (u == 1 ? 'uur' : 'uren') + "</div>";
        }
        if (blok > 1) {
            var m = (Math.floor(t / 60000)) % 60;
            if (m < 1 && blok == 2) {
                min.style.display = "none";
                blok = 1;
            }
            min.innerHTML = "<div class='tg'>" + m + "</div><div class='tt'>" + (m == 1 ? 'minuut' : 'minuten') + "</div>";
        }
        if (blok > 0) {
            var s = (Math.floor(t / 1000)) % 60;
            if (s < 1 && blok == 1) {
                sec.style.display = "none";
                blok = 0;
                eindCounter();
            }
            sec.innerHTML = "<div class='tg'>" + s + "</div><div class='tt'>" + (s == 1 ? 'seconde' : 'seconden') + "</div>";
        }
    }

    function eindCounter() {
        beurs.innerHTML = "<p>Mocht u op onze jobbeurs van donderdag 25 januari geweest zijn dan hopen we dat u ervan genoten heeft.</p><p>U kunt nog altijd een kijkje nemen naar onze CV onder het topic Cursisten.</p><p>Neem gerust contact.</p>"
    }
}

/* _________________________________________________________________________________________ end Welcome Section */


/* SECTION STUDENTS
-------------------------------------------------------------------------------------------- Section Students */
//GLOBALE VARIABLE MET XML-DOC
let cursisten;

function getXML() {
    let url =
        "cursisten.xml";

    $.ajax({
        url: url,
        dataType: "XML",
        beforeSend: function () {
            $("#laadTekst").html("Bezig met laden. Even geduld aub...");
        },
        error: function (obj, status, errormessage) {
            console.dir(errormessage);
            alert("Foto's niet geladen omwille van volgende foutmelding: " + errormessage);
        }
    }).done(function (xml) {
        cursisten = xml;
        $("#laadTekst").hide();
        buildImages(); // foto's toevoegen
        showImg(fotoI); // eerste foto in de rij moet getoond worden bij laden pagina
        currentImg(); // functie die via "onclick" op kleine foto's gebruiker laat kiezen
        hover(); //functie voor hover-effect op grote foto's
        buttons(); // functie die de knoppen bedient
    });
}

function buildImages() { // dynamisch toevoegen van de grote en kleine foto's
    let groteBox = document.getElementById("cursisten-groteFotos");
    let kleineBox = document.getElementById("cursisten-kleineFotos");
    let cursistenList = $(cursisten).find("cursist");

    //for (let index = 1; index <= cursistenList.length; index++) {
    cursistenList.each(function () {
        let imgG = document.createElement("img");
        let imgK = document.createElement("img");

        imgK.src = "./img/cursisten/" + $(this).find("image").text();
        imgG.src = "./img/cursisten/" + $(this).find("image").text();
        imgK.className = "cursisten-Kfoto";
        imgG.className = "cursisten-Gfoto";
        kleineBox.appendChild(imgK);
        groteBox.appendChild(imgG);
    });
}

function hover() {
    let images = document.getElementsByClassName("cursisten-Gfoto"); //HTML-elementsList met images

    for (let index = 0; index < images.length; index++) { // overloop alle foto's in de lijst en doe daar iets mee (this verwijst naar elke foto apart)
        images[index].onmouseover = function () { // wijzig de foto (src van de foto) wanneer je er over gaat
            this.src = this.src.replace(/(.jpg)/, "B.png"); // zoek naar ".jpg" en zet daar net voor een "b"
        }

        images[index].onmouseout = function () { // wijzig de foto (src van de foto) wanneer je er af gaat
            this.src = this.src.replace(/(B.png)/, ".jpg"); // zoek naar een b net voor de ".jpg" en haal deze weg
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

    if (fotoIndex > imagesG.length) {
        fotoI = 1
    }
    if (fotoIndex < 1) {
        fotoI = imagesG.length
    }

    for (i = 0; i < imagesG.length; i++) {
        imagesG[i].style.display = "none";
        imagesK[i].style.opacity = "0.4";
    }

    imagesG[fotoI - 1].style.display = "block";
    imagesK[fotoI - 1].style.opacity = "1";

    let cursist = $(cursisten).find("cursist:nth-child(" + fotoI + ")");
    changeInfo(cursist);
}

function buttons() { // knoppen (komen pas zichtbaar onder de 900px) functie: volgende en vorige
    let btnLeft = document.getElementById("button-left");
    let btnRight = document.getElementById("button-right");

    btnLeft.onclick = () => showImg(fotoI += -1);
    btnRight.onclick = () => showImg(fotoI += 1);
}

function changeInfo(cursist) { // toont dynamisch de juiste titel en tekst bij de juiste cursist
    $("#infoTitel").text(cursist.find("voornaam").text() + " " + cursist.find("naam").text());
    $("#infoTekst").text(cursist.find("info").text());
    $("#cursisten-contacts a").prop("href", "mailto:" + cursist.find("email").text());

    $("#cursist-in").prop('onclick', null).off('click');
    $("#cursist-in").on("click", () => {
        window.open(cursist.find("linkedin").text());
    });
}

/* _________________________________________________________________________________________ end Students Section */