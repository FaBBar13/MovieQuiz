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

// document.onload = setTimeout(afficheFin, 3700);




const infoFilms =
    ' {"movies": { "movie": [' +
    ' { "title": "Beach"    , "picture": "/images/beach.jpg"    },' +
    ' { "title": "Autumn"   , "picture": "/images/autumn.jpg"   },' +
    ' { "title": "cat"      , "picture": "/images/cat.jpg"      },' +
    ' { "title": "dog"      , "picture": "/images/dog.jpg"      },' +
    ' { "title": "field"    , "picture": "/images/field.jpg"    }]}}';


let objinfoFilms = JSON.parse(infoFilms);; //['beach', 'autumn', 'cat', 'dog', 'field', 'beach', 'autumn', 'cat', 'dog', 'field'];
let tabFilmCherche = objinfoFilms.movies.movie;

let objfilmsTrouves = JSON.parse(localStorage.getItem("trouve"));
console.log(objfilmsTrouves);

if (objfilmsTrouves === null) {
    let tabFilmTrouve = {};
    localStorage.setItem("trouve", JSON.stringify(tabFilmTrouve));
}
// let tabFilmTrouve = ['eagle', 'flowers', 'forest', 'cthulhu1', 'eagle', 'flowers', 'forest', 'cthulhu1', 'flowers', 'forest',];


let divFilmCherche = document.getElementById('filmcherche');
let divFilmTrouve = document.getElementById('filmtrouve');


function genereImages(root, tableauRoot , typeRoot ) {

    // alert(root.indexOf('cherche')); => why ?
    
    //  typeRoot : FC , FT , SC , ST


    for (i = 0; i < tableauRoot.length; i++) {
        // let wrapFilm = document.getElementById("wrapperfilm");

        let divFilm = document.createElement("div");
        divFilm.className = "swiper-slide";
        
        let divInterneFilm = document.createElement("div");
        divInterneFilm.className = "div-interne";
        

        let titFilm = document.createElement("a");
        titFilm.innerHTML = "slide + " + i;
        //addEventListener.

        // imgFilm.src = "/images/" + tableauRoot[i] + ".jpg";
        // imgFilm.src = tabFilmCherche.movies.movie[i].picture;
        let imgFilm = document.createElement("img");
        imgFilm.src = tableauRoot[i].picture;

        // let btnRep = document.createElement("button");
        // btnRep.innerHTML = "Répondre";
        // btnRep.className = "bouton-slider";
        // divFilm.appendChild(btnRep);

        divInterneFilm.appendChild(titFilm);
        divInterneFilm.appendChild(imgFilm);
        
        divFilm.appendChild(divInterneFilm);
        root.appendChild(divFilm);
    };

    if (typeRoot === 'FC') {
        divFilmCherche.classList.add('cherche');
    }
    
    
    return new Swiper(root.parentElement, {
        grabCursor : true,
        loop: true,
        
        slidesPerView: 3,
        centeredSlides : true,
        spaceBetween: 10,
        breakpoints: {
            640: {
                slidesPerView: 4,
                centeredSlides : true,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 8,
                spaceBetween: 20
            },
            1400: {
                slidesPerView: 10,
                spaceBetween: 20
            }
        },


    });

};

//genereImages(document.querySelector('.swiper  .swiper-wrapper'));
//genereImages(document.querySelector('.swiper .grise .swiper-wrapper'));

// console.log(document.querySelector('.swiper .swiper-wrapper'))

//genereImages(divFilmCherche, tabFilmCherche.movies.movie);
//

genereImages(divFilmCherche, tabFilmCherche , 'FC' );
// genereImages(divFilmTrouve, tabFilmTrouve);
