


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

// stock  en memoire le fichier de base si appellé de nouveau
let cached;
//const infoFilms = {};
// c'est le point d'entrée aux données du fichier json
async function getData() {
    // retourne la valeur cachée ou enregistre la valeur du fetch et la retourne
    return cached ??= await fetch('infos.json') // ca retourne une réponse
        .then(resp => resp.json()); // ca retourne le json parsé en object
}

getData().then(data => {
    //infoFilms = data;
    console.log(data);

});






const infoFilms =
    ' {"movies": { "movie": [' +
    ' { "idFilm": "F1" ,"title": "Beach"    , "picture": "/images/beach.jpg"    },' +
    ' { "idFilm": "F2" ,"title": "Autumn"   , "picture": "/images/autumn.jpg"   },' +
    ' { "idFilm": "F3" ,"title": "cat"      , "picture": "/images/cat.jpg"      },' +
    ' { "idFilm": "F4" ,"title": "dog"      , "picture": "/images/dog.jpg"      },' +
    ' { "idFilm": "F5" ,"title": "field"    , "picture": "/images/field.jpg"    }]}}';





let objinfoFilms = JSON.parse(infoFilms);
let tabFilmCherche = objinfoFilms.movies.movie;
console.log('tabfilmcherche')
console.log(tabFilmCherche);
// let tabSerieCherche = objinfoFilms.series.serie;/

let map = new Map();

tabFilmCherche.forEach(item => {
    map.set(item.idFilm, item);
});


//console.log(map);

//console.debug(tabFilmCherche.find(i => i.idFilm == 'F2'));

// console.log(tabFilmCherche);
// console.log(tabFilmCherche.movies.movie); // tabFilmCherche.movies.movie[0].title

// let objfilmsTrouves = JSON.parse(localStorage.getItem("trouve"));
// console.log(objfilmsTrouves);

// if (objfilmsTrouves === null) {
//     let tabFilmTrouve = {};
//     localStorage.setItem("trouve", JSON.stringify(tabFilmTrouve));
// }

//let tabFilmTrouve = ['eagle', 'flowers', 'forest', 'cthulhu1', 'eagle', 'flowers', 'forest', 'cthulhu1', 'flowers', 'forest',];

let divFilmCherche = document.getElementById('filmcherche');
let divFilmTrouve = document.getElementById('filmtrouve');


// let tabTrouve = [];


let objDejaTrouves = JSON.parse(localStorage.getItem("trouve"));


// console.log(objfilmsTrouves);

if (objDejaTrouves === null) {
    console.log('pas de local');
    let tabTrouve = [];
    // tabTrouve.push("F1");
    // tabTrouve.push("F4");
    localStorage.setItem("trouve", JSON.stringify(tabTrouve));
    objDejaTrouves = JSON.parse(localStorage.getItem("trouve"));
} else {
    //console.log('local = ' + JSON.parse(localStorage.getItem("trouve")));
    objDejaTrouves = JSON.parse(localStorage.getItem("trouve"));
};




function genereImages(root, tableauRoot) {


    for (i = 0; i < tableauRoot.length; i++) {
        // let wrapFilm = document.getElementById("wrapperfilm");

        if (!objDejaTrouves.includes(tableauRoot[i].idFilm)) {

            let divFilm = document.createElement("div");
            let imgFilm = document.createElement("img");
            let idFilm = document.createElement("h3");

            divFilm.className = "swiper-slide";
            divFilm.dataset.id = tableauRoot[i].idFilm;

            // imgFilm.src = "/images/" + tableauRoot[i] + ".jpg";
            // imgFilm.src = tabFilmCherche.movies.movie[i].picture;
            imgFilm.src = tableauRoot[i].picture;

            idFilm.innerText = tableauRoot[i].idFilm;

            //console.log(idFilm);

            divFilm.appendChild(imgFilm);
            divFilm.appendChild(idFilm);

            divFilm.addEventListener('click', e => afficheModale(divFilm));
            root.appendChild(divFilm);
        }
    };

    // divFilmCherche.classList.add('cherche');



    return new Swiper(root.parentElement, {

        direction: "horizontal",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        // autoplay: {
        //     delay: 2000,
        //     // stoppe le swipe auto si action manuelle
        //     disableOnInteraction: true
        // },
        slidesPerView: 3,
        spaceBetween: 3,
        breakpoints: {
            // 640: {
            //     slidesPerView: 3,

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


    });

};


let reponseSaisie = document.getElementById("reponse");
let reponseATrouver = "";

function afficheModale(elem) {

    document.getElementById("reponse").value = "";
    let ident = elem.dataset.id;

    let item = map.get(ident);

    let modale = document.getElementById("modale");
    let imgModal = document.getElementById("image");
    reponseATrouver = item.title;

    // let reponse = document.getElementById("reponse").value;
    // reponse = '';
    modale.style.visibility = "visible";


    let imgSrc = item.picture;

    imgModal.style.backgroundImage = `url(${imgSrc})`;


    // Masquer la div si clique en dehors ?
    // modale.addEventListener("click", function () {
    //     modale.style.visibility = "hidden";
    // });



}





//genereImages(divFilmCherche, tabFilmCherche);
//genereImages(divFilmTrouve, tabFilmTrouve);


function verifReponse() {
    let reponse = document.getElementById("reponse").value;

    alert('=>' + reponse + ' pour ' + reponseATrouver);

    // if (reponse === )
}
