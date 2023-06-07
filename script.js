//document.write('coucou aussi')



let divLoader = document.getElementById("loader");
let coteGauche = document.getElementById("gauche");
let coteDroite = document.getElementById("droite");
let divFooter = document.querySelector("footer");

let zoneJeu = document.querySelector('.zonejeu');

function afficheFin() {
    divLoader.style.display = "none";
    zoneJeu.style.display = "flex";
    divFooter.style.display = "block";

}

document.onload = setTimeout(afficheFin, 3700);

/*  why ?  */
let mySwiper = new Swiper ('.swiper-container');