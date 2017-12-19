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