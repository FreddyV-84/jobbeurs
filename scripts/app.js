'use strict';

/* tester dmitryi */

var headerHeight;

window.onload = init;
window.onresize = function () {
    headerHeight = document.querySelector('#menu').offsetHeight;
}

function init() {
    headerHeight = document.querySelector('#menu').offsetHeight;

    document.querySelector('.navicon').onclick = toggleMenu;
    var links = document.querySelectorAll('.toggle__menu a');


    for (var i = 0; i < links.length; i++) {
        try {
            throw i
        } catch (ii) {
            links[ii].onclick = (e) => {
                e.preventDefault();
                toggleMenu();
                scrollTo(document.getElementById("section" + (ii + 1)).offsetTop - headerHeight);
            }
        }
    }

    maakCounter("2018-01-25", "12:30:00");
}

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
            if (d < 1) { dag.style.display = "none"; blok = 3; }
            dag.innerHTML = "<h1>" + d + "</h1><h5>" + (d == 0 ? '&nbsp' : d == 1 ? 'DAG' : 'DAGEN') + "</h5>";
        }
        if (blok > 2) {
            var u = (Math.floor(t / 3600000)) % 24;
            if (u < 1 && blok == 3) { uur.style.display = "none"; blok = 2; }
            uur.innerHTML = "<h1>" + u + "</h1><h5>" + (u == 1 ? 'UUR' : 'UREN') + "</h5>";
        }
        if (blok > 1) {
            var m = (Math.floor(t / 60000)) % 60;
            if (m < 1 && blok == 2) { min.style.display = "none"; blok = 1; }
            min.innerHTML = "<h1>" + m + "</h1><h5>" + (m == 1 ? 'MINUUT' : 'MINUTEN') + "</h5>";
        }
        if (blok > 0) {
            var s = (Math.floor(t / 1000)) % 60;
            if (s < 1 && blok == 1) { sec.style.display = "none"; blok = 0; eindCounter(); }
            sec.innerHTML = "<h1>" + s + "</h1><h5>" + (s == 1 ? 'SECONDE' : 'SECONDEN') + "</h5>";
        }
    }
    function eindCounter() {
        beurs.innerHTML = "<br><p>Wij hopen dat u op onze jobbeurs van donderdag 25 januari bent geweest en dat u ervan genoten heeft.</p><br><p>Nog interesse?</p><p>Neem gerust contact.</p>"
    }
}

/* _________________________________________________________________________________________ end Welcome Section */