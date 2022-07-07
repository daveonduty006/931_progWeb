let librairie = {
    "livres" : [
        {
            "id"    : 1,
            "titre" : "Cuisiner au barbecue avec Anne Alassane",
            "auteur": "Anne Alassane",
            "pages" : 123,
            "prix"  : 27.95,
            "image" : "livre1.jpg"
        },
        {
            "id"    : 2,
            "titre" : "Salades gourmandes : créatives et terriblement addictives",
            "auteur": "Emilie Franzo",
            "pages" : 192,
            "prix"  : 29.95,
            "image" : "livre2.jpg"
        },
        {
            "id"    : 3,
            "titre" : "One Last Stop",
            "auteur": "Casey Mcquiston",
            "pages" : 553,
            "prix"  : 29.95,
            "image" : "livre3.jpg"
        }
    ],
    "papeteries" : [
        {
            "id"    : 1,
            "titre" : "Papier multi-usage 8 1/2'' - 11'' 500f",
            "sujet": "tablette bloc-note planchette",
            "prix"  : 11.99,
            "image" : "papeterie1.jpg"
        },
        {
            "id"    : 2,
            "titre" : "Sac à lunch rouge",
            "sujet": "boite à lunch",
            "prix"  : 22.99,
            "image" : "papeterie2.jpg"
        },
        {
            "id"    : 3,
            "titre" : "Boîte à lunch Super Mario Bros",
            "sujet": "boite à lunch",
            "prix"  : 16.99,
            "image" : "papeterie3.jpg"
        }
    ]
}
let cheminLivres = "../images/livres/";
let cheminPapeterie = "../images/papeterie/";
let initialiser = () => {
    document.getElementById('imgLivre').src = cheminLivres+librairie.livres[0].image;
    document.getElementById('titreLivre').innerHTML = librairie.livres[0].titre;
    document.getElementById('prixLivre').innerHTML = librairie.livres[0].prix+"$";
    document.getElementById('infosLivre').innerHTML = "Auteur : "+librairie.livres[0].auteur+"<br>Pages : "+librairie.livres[0].pages;

    document.getElementById('imgPap').src = cheminPapeterie+librairie.papeteries[0].image;
    document.getElementById('titrePap').innerHTML = librairie.papeteries[0].titre;
    document.getElementById('prixPap').innerHTML = librairie.papeteries[0].prix+"$";
    document.getElementById('infosPap').innerHTML = "Sujet : "+librairie.papeteries[0].sujet;
    //Générer le contenu du select pour les livres
    let tabLivres = librairie.livres;
    let selLivres = document.getElementById('selLivres');
    for(let unLivre of tabLivres){
        selLivres.options[selLivres.options.length] = new Option(unLivre.titre,unLivre.id);
    }
    //Générer le contenu du select pour les papeteries
    let tabPapeteries = librairie.papeteries;
    let selPap = document.getElementById('selPap');
    for(let unPap of tabPapeteries){
        selPap.options[selPap.options.length] = new Option(unPap.titre,unPap.id);
    }
}