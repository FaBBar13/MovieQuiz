

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
    let tabTrouve = [];
    localStorage.setItem("identTrouve", JSON.stringify(tabTrouve));
    identDejaTrouves = JSON.parse(localStorage.getItem("identTrouve"));
};

function afficheJeu(type) {


    let collapsible = new bootstrap.Collapse('#navbarNavAltMarkup', {
        toggle: false
    });

    let lesFilms = document.querySelectorAll('.films');;
    let lesSeries = document.querySelectorAll('.series');

    for (i = 0; i < lesFilms.length; i++) {
        lesFilms[i].style = "display : block;";
    };
    for (i = 0; i < lesSeries.length; i++) {
        lesSeries[i].style = "display : block;";
    };

    if (type == 'S') {

        for (i = 0; i < lesFilms.length; i++) {
            lesFilms[i].style = "display : none;";
        };

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


const createSwiper = (swiper) => new Swiper(swiper,
    {
        direction: "horizontal",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto"
    }
);


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

                let tmpIdTmdb = tableauRoot[i].idtmdb;
                divFilm.className = "swiper-slide";
                divFilm.dataset.id = tableauRoot[i].identifiant;

                imgFilm.src = tableauRoot[i].picture;

                let titreFilm = tableauRoot[i].title;


                divFilm.appendChild(imgFilm);

                divFilm.addEventListener('click', e => afficheModale(divFilm.dataset.id, imgFilm.src, titreFilm, tmpIdTmdb));
                root.appendChild(divFilm);
            }
        };

        return createSwiper(root.parentElement);


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
        return createSwiper(root.parentElement);

    };

    genereCherche(divFilmCherche, tabFilmCherche);
    genereCherche(divSerieCherche, tabSerieCherche);

    genereTrouve(divFilmTrouve, tabFilmTrouve);
    genereTrouve(divSerieTrouve, tabSerieTrouve);


});


let reponseATrouver = "";
let identATrouver = "";
let idTmdbATrouver = "";
let modale = document.getElementById("modale");


function afficheModale(ident, Image, Titre, idtmdb) {

    let imgSrc = Image;
    identATrouver = ident;
    reponseATrouver = Titre;
    idTmdbATrouver = idtmdb;
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

function verifReponse(e) {
    //console.log('timer');

    e.preventDefault();
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

    //libResultat.style.display = 'block;'

    libResultat.style.visibility = 'visible;'
    if (tmpSai == tmpTit) {
        //console.log('Bonne Réponse');
        //libResultat.style.visibility = 'visible;'
        libResultat.style = 'background:green;'
        libResultat.innerHTML = "BONNE REPONSE";
        let locStorage = JSON.parse(localStorage.getItem("identTrouve"));
        locStorage.push(identATrouver);
        localStorage.setItem("identTrouve", JSON.stringify(locStorage));

        let newAff = [];

        newAff.push(identATrouver, reponseATrouver, idTmdbATrouver);
        localStorage.setItem("dernierAffiche", JSON.stringify(newAff));

        // fait un refresh de la page pour MAJ des swipers
        setTimeout(() => {
            location.replace('index.html');
        }, 3000);

    }
    else {
        //console.log('Mauvaise Réponse');
        //libResultat.style.visibility = 'visible;'
        libResultat.style = 'background:red;'
        libResultat.innerHTML = "MAUVAISE REPONSE";

        setTimeout(() => {
            document.getElementById("reponse").value = '';
            document.getElementById("reponse").focus();
            libResultat.style.visibility = 'hidden';

        }, 3000);


    };



}


let divInfos = document.querySelector('.infos');
let titInfos = document.querySelector('.infos h2');

let btnBA = document.getElementById('btn-ba');
let btnInfo = document.getElementById('btn-info');


let idDetails = "";
let titreDetails = document.getElementById("titreDetails");
let idTmdbDetails = "";
let synopsysDetail = document.getElementById("synopsys");
let imgDetail = "";


btnInfo.addEventListener("click", afficheDetails);
let modaleDetails = document.getElementById("details");

let afficheDefaut = JSON.parse(localStorage.getItem("dernierAffiche"));

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
    const urlFind = new URL(API_ROOT + endpoint + idtmdb + "/credits");


    url.searchParams.append('language', 'fr-FR');
    // urlFind.searchParams.append('language', 'fr-FR');

    const result = await fetch(url, api_options).then(resp => resp.json());
    const resultFind = await fetch(urlFind, api_options).then(reponse => reponse.json());





    //console.log(resultFind);

    //console.log(resultFind.cast.length);
    let maxCast = 0;
    if (resultFind.cast.length > 8) {
        maxCast = 8;
    } else {
        maxCast = resultFind.cast.length;
    };

    let tabCasting = [];
    let divCasting = document.getElementById("acteurs");
    for (x = 0; x < maxCast; x++) {
        let nom = resultFind.cast[x].name;
        let perso = resultFind.cast[x].character;
        let cheminPhoto = API_IMAGE_ROOT + 'w185' + resultFind.cast[x].profile_path;
        //let cheminPhoto = API_IMAGE_ROOT + 'w185' + resultFind.cast[x].profile_path;
        tabCasting.push(
            {
                "nom": nom,
                "perso": perso,
                "photo": cheminPhoto
            });
    };
    function genereCasting() {
        for (z = 0; z < tabCasting.length; z++) {
            let divActeur = document.createElement("div");
            let imgActeur = document.createElement("img");
            let nomActeur = document.createElement("h3");
            let nomPerso = document.createElement("h4");

            divActeur.className = "swiper-slide";
            imgActeur.src = tabCasting[z].photo;
            nomActeur.innerHTML = tabCasting[z].nom;
            nomPerso.innerHTML = tabCasting[z].perso;

            divActeur.appendChild(imgActeur);
            divActeur.appendChild(nomActeur);
            divActeur.appendChild(nomPerso);

            divCasting.appendChild(divActeur);
        }
        return createSwiper(divCasting.parentElement);

    };
    genereCasting();


    // valeur de largeur w342 , w500, w780 , 

    const affiche = API_IMAGE_ROOT + 'w780' + result.poster_path;
    const backdrop = API_IMAGE_ROOT + 'w780' + result.backdrop_path;


    console.log(tabCasting);

    modale.style.visibility = "hidden";
    modaleDetails.style.visibility = "hidden";
    divInfos.style.backgroundImage = 'url(' + affiche + ')';
    titInfos.innerHTML = titre;
    //console.log(afficheDefaut[0] + '/' + afficheDefaut[1]);

    idDetails = id;
    titreDetails.innerHTML = titre;
    idTmdbDetails = idtmdb;

    modaleDetails.style.backgroundImage = 'url(' + backdrop + ')';
    synopsysDetail.innerHTML = result.overview;

    let newAff = [];
    newAff.push(id, titre, idtmdb);
    localStorage.setItem("dernierAffiche", JSON.stringify(newAff));


    window.scroll({
        top: 0
    });

};

if (afficheDefaut === null) {
    let derAff = [];
    derAff.push('F0', 'La Soupe aux Choux', 9317);
    localStorage.setItem("dernierAffiche", JSON.stringify(derAff));
    afficheInfos('F0', 'La Soupe aux Choux', 9317);
} else {
    afficheInfos(afficheDefaut[0], afficheDefaut[1], afficheDefaut[2]);
};




function afficheDetails() {
    //console.log(idDetails, titreDetails, idTmdbDetails);
    modaleDetails.style.visibility = "visible";



    modaleDetails.addEventListener("click", function () {
        modaleDetails.style.visibility = "hidden";
    });
}