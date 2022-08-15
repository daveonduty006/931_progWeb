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
let totalLivre = 0;
let totalPapeterie = 0;
let totalFacture = 0;
let totalTaxes = 0;
const TAXES = 0.1556;

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

let traiterLivre = () => {
    let selLivres = document.getElementById('selLivres');
    let idLivre = selLivres.options[selLivres.selectedIndex].value;
    let objLivre = librairie.livres.find(unLivre =>unLivre.id == idLivre);

    document.getElementById('imgLivre').src = cheminLivres+objLivre.image;
    document.getElementById('titreLivre').innerHTML = objLivre.titre;
    document.getElementById('prixLivre').innerHTML = objLivre.prix+"$";
    document.getElementById('infosLivre').innerHTML = "Auteur : "+objLivre.auteur+"<br>Pages : "+objLivre.pages;

    //Calcul de la facture pour le livre
    totalLivre = objLivre.prix;
    totalTaxes = (totalLivre+totalPapeterie)*TAXES;
    totalFacture = totalLivre+totalPapeterie+totalTaxes;
    totalFacturePayer();
}

let traiterPap = () => {
    let selPap = document.getElementById('selPap');
    let idPap = selPap.options[selPap.selectedIndex].value;
    let objPap = librairie.papeteries.find(unPap =>unPap.id == idPap);

    document.getElementById('imgPap').src = cheminPapeterie+objPap.image;
    document.getElementById('titrePap').innerHTML = objPap.titre;
    document.getElementById('prixPap').innerHTML = objPap.prix+"$";
    document.getElementById('infosPap').innerHTML = "Sujet : "+objPap.sujet;

    //Calcul de la facture pour la papeterie
    totalPapeterie = objPap.prix;
    totalTaxes = (totalPapeterie+totalLivre)*TAXES;
    totalFacture = totalPapeterie+totalLivre+totalTaxes;
    totalFacturePayer();
}

function totalFacturePayer() {
    let facture = " ";
    if(totalLivre > 0){
        facture+=" <b>Livre = </b>"+totalLivre.toFixed(2)+"$ ";
        //totalLivre = 0;
    }
    if(totalPapeterie > 0){
        facture+="   <b>Papeterie = </b>"+totalPapeterie.toFixed(2)+"$ ";
        //totalPapeterie = 0;
    }
    facture+="   <b>totalTaxes = </b>"+totalTaxes.toFixed(2)+"$ ";
    facture+="<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;À PAYER = </b>"+totalFacture.toFixed(2)+"$";
    document.getElementById('facture').innerHTML = facture;
}