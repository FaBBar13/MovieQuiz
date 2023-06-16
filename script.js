


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
// document.onload = setTimeout(afficheFin, 3700);

/* */

let filmDejaTrouves = JSON.parse(localStorage.getItem("filmtrouve"));
if (filmDejaTrouves === null) {
    console.log('pas de local');
    let tabTrouve = [];
    // tabTrouve.push("F1");
    // tabTrouve.push("F4");

    localStorage.setItem("filmtrouve", JSON.stringify(tabTrouve));
    filmDejaTrouves = JSON.parse(localStorage.getItem("filmtrouve"));

};
console.log(filmDejaTrouves);

let serieDejaTrouves = JSON.parse(localStorage.getItem("serietrouve"));
if (serieDejaTrouves === null) {
    console.log('pas de local');
    let tabTrouve = [];
    // tabTrouve.push("S2");
    // tabTrouve.push("S3");

    localStorage.setItem("serietrouve", JSON.stringify(tabTrouve));
    serieDejaTrouves = JSON.parse(localStorage.getItem("serietrouve"));
};



/* */
let divFilmCherche = document.getElementById('filmcherche');
let divFilmTrouve = document.getElementById('filmtrouve');

let tabFilmCherche = {};
let tabSerieCherche = {};

let divSerieCherche = document.getElementById('seriecherche');
let divSerieTrouve = document.getElementById('serietrouve');

let tabFilmTrouve = {};
let tabSerieTrouve = {};
// stock  en memoire le fichier de base si appellé de nouveau
let cached;

// c'est le point d'entrée aux données du fichier json
async function getData() {
    // retourne la valeur cachée ou enregistre la valeur du fetch et la retourne
    return cached ??= await fetch('infos.json')     // ca retourne une réponse
        .then(resp => resp.json());                 // ca retourne le json parsé en object
}

getData().then(data => {

    //console.log(data);
    //console.log(data.movies.movie[1]);

    // let tabFilmCherche = data.movies.movie;
    // let tabSerieCherche = data.series.serie;
    tabFilmCherche = data.movies.movie;
    tabSerieCherche = data.series.serie;

    //console.log('tabfilmcherche')
    //console.log(tabFilmCherche);
    //console.log(tabSerieCherche);


    let mapFilm = new Map();

    tabFilmCherche.forEach(item => {
        mapFilm.set(item.idFilm, item);
    });
    //console.log(mapFilm);

    let mapSerie = new Map();
    tabSerieCherche.forEach(item => {
        mapSerie.set(item.idSerie, item);
    });
    //console.log(mapSerie);

    //console.log(objDejaTrouves);

    function genereImages(root, tableauRoot) {

        // console.log(root.id);
        if (root.id == "filmcherche") {
            for (i = 0; i < tableauRoot.length; i++) {
                if (!filmDejaTrouves.includes(tableauRoot[i].idFilm)) {

                    let divFilm = document.createElement("div");
                    let imgFilm = document.createElement("img");
                    //let titreFilm = document.createElement("h3");

                    divFilm.className = "swiper-slide";
                    divFilm.dataset.id = tableauRoot[i].idFilm;

                    imgFilm.src = tableauRoot[i].picture;

                    let titreFilm = tableauRoot[i].title;

                    //console.log(idFilm);

                    divFilm.appendChild(imgFilm);
                    //divFilm.appendChild(titreFilm);

                    // divFilm.addEventListener('click', e => afficheModale(divFilm));
                    divFilm.addEventListener('click', e => afficheModale(divFilm.dataset.id, imgFilm.src, titreFilm));
                    root.appendChild(divFilm);
                }
            };

        } else if (root.id == "seriecherche") {

            for (i = 0; i < tableauRoot.length; i++) {
                if (!serieDejaTrouves.includes(tableauRoot[i].idSerie)) {

                    let divSerie = document.createElement("div");
                    let imgSerie = document.createElement("img");
                    //let idSerie = document.createElement("h3");

                    divSerie.className = "swiper-slide";
                    divSerie.dataset.id = tableauRoot[i].idSerie;

                    imgSerie.src = tableauRoot[i].picture;

                    let titreSerie = tableauRoot[i].title;

                    //console.log(idFilm);

                    divSerie.appendChild(imgSerie);
                    //divSerie.appendChild(idSerie);

                    divSerie.addEventListener('click', e => afficheModale(divSerie.dataset.id, imgSerie.src, titreSerie));
                    root.appendChild(divSerie);
                }
            };

        };
    };



    genereImages(divFilmCherche, tabFilmCherche);
    genereImages(divSerieCherche, tabSerieCherche);

});







let reponseSaisie = document.getElementById("reponse");
let reponseATrouver = "";

function afficheModale(ident, Image, Titre) {

    document.getElementById("reponse").value = "";

    console.log("ds la modale");
    console.log(ident + ' ' + Image + ' ' + Titre);

    let id = ident;
    let imgSrc = Image;
    let reponseATrouver = Titre;
    //console.log(id + ' ' + imgSrc + ' ' + reponseATrouver);

    //let item = map.get(ident);



    let modale = document.getElementById("modale");
    let imgModal = document.getElementById("image");
    // reponseATrouver = id; // item.title;

    // let reponse = document.getElementById("reponse").value;
    // reponse = '';
    modale.style.visibility = "visible";

    imgModal.style.backgroundImage = `url(${imgSrc})`;


    // Masquer la div si clique en dehors ?
    imgModal.addEventListener("click", function () {
        modale.style.visibility = "hidden";
    });



}





//genereImages(divFilmCherche, tabFilmCherche);
//genereImages(divFilmTrouve, tabFilmTrouve);


function verifReponse() {

    let reponse = document.getElementById("reponse").value;

    alert('=>' + reponse + ' pour ' + reponseATrouver);

    // if (reponse === )
}


const swiper1 = new Swiper(divFilmCherche.parentElement,
    {
        direction: "horizontal",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 3,
        breakpoints: {
            // 640: {
            //     slidesPerView: 3
            // },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 8,
            },
        },
    }
);

const swiper2 = new Swiper(divSerieCherche.parentElement,

    {
        direction: "horizontal",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 3,
        breakpoints: {
            // 640: {
            //     slidesPerView: 3
            // },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 8,
            },
        },
    }
);