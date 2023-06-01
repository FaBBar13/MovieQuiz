//document.write('coucou aussi')

let coteGauche = document.getElementById("gauche");
let coteDroite = document.getElementById("droite");

let divLoader = document.getElementById("loader");
let divFin = document.getElementById('fin');



function afficheFin() {
    divLoader.style.display = "none";
    divFin.style.display = "block";
}

// document.onload = setTimeout(afficheFin, 2000);