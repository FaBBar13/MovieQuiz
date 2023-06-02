//document.write('coucou aussi')

let coteGauche = document.getElementById("gauche");
let coteDroite = document.getElementById("droite");

let divLoader = document.getElementById("loader");
let divFin = document.getElementById('fin');



function afficheFin() {
    divLoader.style.display = "none";
}

document.onload = setTimeout(afficheFin, 3500);