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


// const monObjetJson = JSON.stringify({
//     movies: {
//         movie: [...(new Array(150))].map(x => ({
//             title: 'Le titre',
//             picture: 'image',
//         })),
// serie: {}

//     }
// });



let objinfoFilms = JSON.parse(infoFilms);; //['beach', 'autumn', 'cat', 'dog', 'field', 'beach', 'autumn', 'cat', 'dog', 'field'];
let tabFilmCherche = objinfoFilms.movies.movie;
// console.log(tabFilmCherche);
// console.log(tabFilmCherche.movies.movie); // tabFilmCherche.movies.movie[0].title

// ici expansion : permet de pointer vers la clé plus facilement , surtout si plusieurs clés dans
// le tableau ( séries à mettre par exemple)
//let tabmovie = tabFilmCherche.movies.movie;
//console.log(tabmovie);
// console.log(movie[1].picture)

// const  movie  = tabFilmCherche.movies.movie; 
// const { title, picture } = movie[0]; -> expansion aussi sur les clés de 'movie' et avoir les proprietés
// console.log(title, picture);

let tabFilmTrouve = ['eagle', 'flowers', 'forest', 'cthulhu1', 'eagle', 'flowers', 'forest', 'cthulhu1', 'flowers', 'forest',];

let divFilmCherche = document.getElementById('filmcherche');
let divFilmTrouve = document.getElementById('filmtrouve');


function genereImages(root, tableauRoot) {

    for (i = 0; i < tableauRoot.length; i++) {
        // let wrapFilm = document.getElementById("wrapperfilm");

        let divfilm = document.createElement("div");
        let imgFilm = document.createElement("img");

        divfilm.className = "swiper-slide";

        // imgFilm.src = "/images/" + tableauRoot[i] + ".jpg";
        // imgFilm.src = tabFilmCherche.movies.movie[i].picture;
        imgFilm.src = tableauRoot[i].picture;

        //divfilm.appendChild(titfilm);
        divfilm.appendChild(imgFilm);

        root.appendChild(divfilm);
    };

    divFilmCherche.classList.add('cherche');

    return new Swiper(root.parentElement, {

        loop: true,
        // autoplay: {
        //     delay: 2000,
        //     // stoppe le swipe auto si action manuelle
        //     disableOnInteraction: true
        // },
        slidesPerView: 3,
        spaceBetween: 10,
        breakpoints: {
            640: {
                slidesPerView: 3,
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

genereImages(divFilmCherche, tabFilmCherche);
genereImages(divFilmTrouve, tabFilmTrouve);
