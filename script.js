


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

let identDejaTrouves = JSON.parse(localStorage.getItem("identTrouve"));
if (identDejaTrouves === null) {
    console.log('pas de local');
    let tabTrouve = [];
    //tabTrouve.push('F0');
    localStorage.setItem("identTrouve", JSON.stringify(tabTrouve));
    identDejaTrouves = JSON.parse(localStorage.getItem("identTrouve"));

};
console.log(identDejaTrouves);


//const menuMin = new bootstrap.Modal(document.getElementById('navbarNavAltMarkup'));
// function toogleNavBar() {
//     menuMin.toggle();
// };

//document.querySelector('#navbarNavAltMarkup').modal('toggle');

function afficheJeu(type) {

    // const modal = document.querySelector('#navbarNavAltMarkup');
    // function toggleNavBar() {
    //     modal.toggle();
    // };
    let collapsible = new bootstrap.Collapse('#navbarNavAltMarkup', {
        toggle: false
    });
    // collapsible.hide();
    let lesFilms = document.querySelectorAll('.films');;
    let lesSeries = document.querySelectorAll('.series');

    for (i = 0; i < lesFilms.length; i++) {
        lesFilms[i].style = "display : block;";
    };
    for (i = 0; i < lesSeries.length; i++) {
           lesSeries[i].style = "display : block;";
    };

    if (type == 'S') {
        // console.log('Series');

        for (i = 0; i < lesFilms.length; i++) {
            lesFilms[i].style = "display : none;";
        };
        // toggleNavBar();
        
    } 
    else if (type == 'F') {

        for (i = 0; i < lesSeries.length; i++) {
            lesSeries[i].style = "display : none;";
        };

    } 
    else if (type == 'A') {
        window.scroll({
            top: 0
        });
    };
    
    collapsible.hide();
};


/* */
let divFilmCherche = document.getElementById('filmcherche');
let divFilmTrouve = document.getElementById('filmtrouve');

let tabFilmCherche = [];
let tabSerieCherche = [];

let divSerieCherche = document.getElementById('seriecherche');
let divSerieTrouve = document.getElementById('serietrouve');

let tabFilmTrouve = [];
let tabSerieTrouve = [];

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

    tabFilmCherche = data.movies.movie;
    tabSerieCherche = data.series.serie;



    /* tableaux des trouvés tabFilmTrouve / tabSerieTrouve */

    for (i = 0; i < identDejaTrouves.length; i++) {
        let id = identDejaTrouves[i];
        for (x = 0; x < tabFilmCherche.length; x++) {

            if (tabFilmCherche[x].identifiant == id) {
                tabFilmTrouve.push(
                    {
                        "identifiant": tabFilmCherche[x].identifiant,
                        "picture": tabFilmCherche[x].picture,
                        "title": tabFilmCherche[x].title,
                        "idtmdb": tabFilmCherche[x].idtmdb
                    }
                );
            };
            if (tabSerieCherche[x].identifiant == id) {
                tabSerieTrouve.push(
                    {
                        "identifiant": tabSerieCherche[x].identifiant,
                        "picture": tabSerieCherche[x].picture,
                        "title": tabSerieCherche[x].title,
                        "idtmdb": tabSerieCherche[x].idtmdb
                    }
                );
            };

        };
    };


    function genereCherche(root, tableauRoot) {

        for (i = 0; i < tableauRoot.length; i++) {
            if (!identDejaTrouves.includes(tableauRoot[i].identifiant)) {

                let divFilm = document.createElement("div");
                let imgFilm = document.createElement("img");

                divFilm.className = "swiper-slide";
                divFilm.dataset.id = tableauRoot[i].identifiant;

                imgFilm.src = tableauRoot[i].picture;

                let titreFilm = tableauRoot[i].title;


                divFilm.appendChild(imgFilm);

                divFilm.addEventListener('click', e => afficheModale(divFilm.dataset.id, imgFilm.src, titreFilm));
                root.appendChild(divFilm);
            }
        };

        return new Swiper(root.parentElement,
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

    };
    function genereTrouve(root, tableauRoot) {

        //console.log(tableauRoot[1].identifiant);
        for (i = 0; i < tableauRoot.length; i++) {
            let divFilm = document.createElement("div");
            let imgFilm = document.createElement("img");
            let titreFilm = document.createElement("h3");

            let idtmdb = tableauRoot[i].idtmdb;
            divFilm.className = "swiper-slide";
            divFilm.dataset.id = tableauRoot[i].identifiant;

            imgFilm.src = tableauRoot[i].picture;

            titreFilm.innerHTML = tableauRoot[i].title;


            divFilm.appendChild(imgFilm);
            divFilm.appendChild(titreFilm);

            // 
            divFilm.addEventListener('click', e => afficheInfos(divFilm.dataset.id, titreFilm.innerHTML, idtmdb));
            root.appendChild(divFilm);
        }
        return new Swiper(root.parentElement,
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



    };

    genereCherche(divFilmCherche, tabFilmCherche);
    genereCherche(divSerieCherche, tabSerieCherche);

    genereTrouve(divFilmTrouve, tabFilmTrouve);
    genereTrouve(divSerieTrouve, tabSerieTrouve);


});








let reponseATrouver = "";
let identATrouver = "";
let modale = document.getElementById("modale");

function masqueModale() {
    setTimeout(() => {

        modale.style.visibility = " hidden;";
    }, 3000)
};


function afficheModale(ident, Image, Titre) {



    //placeFocus() : ? why

    let imgSrc = Image;
    identATrouver = ident;
    reponseATrouver = Titre;

    let imgModal = document.getElementById("image");

    modale.addEventListener("submit", verifReponse);

    modale.style.visibility = "visible";
    imgModal.style.backgroundImage = `url(${imgSrc})`;
    

    // retour : Masquer la div si clique sur image  ?
    imgModal.addEventListener("click", function () {
        modale.style.visibility = "hidden";
    });

    document.getElementById("reponse").value = "";
    document.getElementById("reponse").focus();
    
    window.scroll({
        top: 0
    });
};

let libResultat = document.getElementById("resultat");


function verifReponse() {

    let reponseSaisie = document.getElementById("reponse").value;


    /* */
    let tmpSai = "";
    let tmpTit = "";
    tmpSai = reponseSaisie.toLowerCase();
    tmpSai = ((tmpSai.replaceAll('é', 'e')).replaceAll('è', 'e')).replaceAll(' ', '');
    tmpSai = tmpSai.replaceAll('à', 'a');
    tmpSai = tmpSai.replaceAll('-', '');

    tmpTit = reponseATrouver.toLowerCase();
    tmpTit = ((tmpTit.replaceAll('é', 'e')).replaceAll('è', 'e')).replaceAll(' ', '');
    tmpTit = tmpTit.replaceAll('à', 'a');
    tmpTit = tmpTit.replaceAll('-', '');
    //alert('=>' + reponseSaisie +" = " + tmpSai + ' <=> ' + tmpTit + '  ' + reponseATrouver + " id = " + identATrouver);

    // libResultat.style = 'visibility : visible;'


    if (tmpSai == tmpTit) {
        //console.log('Bonne Réponse');

        libResultat.style = 'color:green;'
        libResultat.innerHTML = "BONNE REPONSE";
        let locStorage = JSON.parse(localStorage.getItem("identTrouve"));
        locStorage.push(identATrouver);
        localStorage.setItem("identTrouve", JSON.stringify(locStorage));

    }
    else {
        //console.log('Mauvaise Réponse');

        libResultat.style = 'color:red;'
        libResultat.innerHTML = "MAUVAISE REPONSE";

    };


    //alert('visible');


};



let divInfos = document.querySelector('.infos');
let titInfos = document.querySelector('.infos h2');

let btnBA = document.getElementById('btn-ba');
let btnInfo = document.getElementById('btn-info');
// let idTMDB = document.getElementById('id-tmdb');
// idTMDB.textContent = "9317";

titInfos.textContent = "La Soupe aux Choux";

//btnInfo.addEventListener("click", afficheInfos);


const API_IMAGE_ROOT = '//image.tmdb.org/t/p/';
const API_ROOT = 'https://api.themoviedb.org/3';
const api_options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzdjNGUzOTc4ZTk2YjI1Y2UwMGFlNjliNDlmZGRiYiIsInN1YiI6IjY0OTAxMjBmYzJmZjNkMDBmZmJjOGI4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F6AMNu8DQklsNyGViYL1fEvgDaOaxnY9auZe5li8VGk'
    }
};



async function afficheInfos(id, titre, idtmdb) {

    const endpoint = id.startsWith('F') ? '/movie/' : '/tv/';

    const url = new URL(API_ROOT + endpoint + idtmdb);
    url.searchParams.append('language', 'fr-FR');

    const result = await fetch(url, api_options).then(resp => resp.json());

    console.log(result);
    // valeur de largeur w342 , w500, w780 , 
    const bigImage = API_IMAGE_ROOT + 'w780' + result.poster_path;

    modale.style.visibility = "hidden";
    divInfos.style.backgroundImage = 'url(' + bigImage + ')';
    titInfos.innerHTML = titre;
    
    window.scroll({
        top: 0
    });

};