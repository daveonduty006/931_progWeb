let menu = {
    "entrees" : [
        {
            "id"    : 1,
            "titre" : "Frites",
            "prix"  : 0.99,
            "image" : "entree1.jpg"
        },
        {
            "id"    : 2,
            "titre" : "Frites Spirales",
            "prix"  : 1.49,
            "image" : "entree2.jpg"
        },
        {
            "id"    : 3,
            "titre" : "Frites Patates Douces",
            "prix"  : 1.49,
            "image" : "entree3.jpg"
        },
        {
            "id"    : 4,
            "titre" : "Frites au Fromage",
            "prix"  : 2.99,
            "image" : "entree4.jpg"
        },
        {
            "id"    : 5,
            "titre" : "Nachos Pollos",
            "prix"  : 3.99,
            "image" : "entree5.jpg"
        },
        {
            "id"    : 6,
            "titre" : "Corn Dog",
            "prix"  : 1.99,
            "image" : "entree6.jpg"
        },
        {
            "id"    : 7,
            "titre" : "Rondelles d'Oignon",
            "prix"  : 1.99,
            "image" : "entree7.jpg"
        },
        {
            "id"    : 8,
            "titre" : "Taco Pollos Piquante",
            "prix"  : 2.99,
            "image" : "entree8.jpg"
        },
        {
            "id"    : 9,
            "titre" : "Enchiladas",
            "prix"  : 3.99,
            "image" : "entree9.jpg"
        },
        {
            "id"    : 10,
            "titre" : "Riz et Haricots",
            "prix"  : 2.99,
            "image" : "entree10.jpg"
        }
    ],
    "repas" : [
        {
            "id"    : 1,
            "titre" : "Poulet Frit Pollos Originale 3mcx",
            "prix"  : 10.99,
            "image" : "repas1.jpg"
        },
        {
            "id"    : 2,
            "titre" : "Poulet Frit Pollos Originale 6mcx",
            "prix"  : 15.99,
            "image" : "repas2.jpg"
        },
        {
            "id"    : 3,
            "titre" : "Poulet Frit Pollos Originale 9mcx",
            "prix"  : 19.99,
            "image" : "repas3.jpg"
        },
        {
            "id"    : 4,
            "titre" : "Poulet Frit Pollos Originale 12mcx",
            "prix"  : 26.99,
            "image" : "repas4.jpg"
        },
        {
            "id"    : 5,
            "titre" : "Plateau de 5 Tacos Pollos Piquante",
            "prix"  : 12.99,
            "image" : "repas5.jpg"
        },
        {
            "id"    : 6,
            "titre" : "Plateau de 4 Enchiladas",
            "prix"  : 13.99,
            "image" : "repas6.jpg"
        },
        {
            "id"    : 7,
            "titre" : "Plateau de 2 Burritos Rio Grande",
            "prix"  : 14.99,
            "image" : "repas7.jpg"
        },
        {
            "id"    : 8,
            "titre" : "Plateau de 4 Quesadillas",
            "prix"  : 15.99,
            "image" : "repas8.jpg"
        },
        {
            "id"    : 9,
            "titre" : "Burger Los Gordo Hermanos",
            "prix"  : 8.99,
            "image" : "repas9.jpg"
        },
        {
            "id"    : 10,
            "titre" : "Bol Chili Con Carne !Caliente!",
            "prix"  : 13.99,
            "image" : "repas10.jpg"
        }
    ]
}
let cheminEntrees = "../images/entrees/";
let cheminRepas = "../images/repas/";
let totalEntree = 0;
let totalRepas = 0;
let totalFacture = 0;
let totalTaxes = 0;
const TAXES = 0.1556;

let initialiser = () => {
    document.getElementById('imgEntree').src = cheminEntrees+menu.entrees[0].image;
    document.getElementById('titreEntree').innerHTML = menu.entrees[0].titre;
    document.getElementById('prixEntree').innerHTML = menu.entrees[0].prix+"$";
    document.getElementById('imgRepas').src = cheminRepas+menu.repas[0].image;
    document.getElementById('titreRepas').innerHTML = menu.repas[0].titre;
    document.getElementById('prixRepas').innerHTML = menu.repas[0].prix+"$";
    //Générer le contenu du select pour les entrées
    let tabEntrees = menu.entrees;
    let selEntrees = document.getElementById('selEntrees');
    for(let uneEntree of tabEntrees){
        selEntrees.options[selEntrees.options.length] = new Option(uneEntree.titre,uneEntree.id);
    }
    //Générer le contenu du select pour les repas
    let tabRepas = menu.repas;
    let selRepas = document.getElementById('selRepas');
    for(let unRepas of tabRepas){
        selRepas.options[selRepas.options.length] = new Option(unRepas.titre,unRepas.id);
    }
}

let traiterEntree = () => {
    let selEntrees = document.getElementById('selEntrees');
    let idEntree = selEntrees.options[selEntrees.selectedIndex].value;
    let objEntree = menu.entrees.find(uneEntree =>uneEntree.id == idEntree);
    document.getElementById('imgEntree').src = cheminEntrees+objEntree.image;
    document.getElementById('titreEntree').innerHTML = objEntree.titre;
    document.getElementById('prixEntree').innerHTML = objEntree.prix+"$";
    //Calcul de la facture pour l'entrée
    totalEntree = objEntree.prix;
    totalTaxes = (totalEntree+totalRepas)*TAXES;
    totalFacture = totalEntree+totalRepas+totalTaxes;
    totalFacturePayer();
}

let traiterRepas = () => {
    let selRepas = document.getElementById('selRepas');
    let idRepas = selRepas.options[selRepas.selectedIndex].value;
    let objRepas = menu.repas.find(unRepas =>unRepas.id == idRepas);
    document.getElementById('imgRepas').src = cheminRepas+objRepas.image;
    document.getElementById('titreRepas').innerHTML = objRepas.titre;
    document.getElementById('prixRepas').innerHTML = objRepas.prix+"$";
    //Calcul de la facture pour le repas
    totalRepas = objRepas.prix;
    totalTaxes = (totalRepas+totalEntree)*TAXES;
    totalFacture = totalRepas+totalEntree+totalTaxes;
    totalFacturePayer();
}

function totalFacturePayer() {
    let facture = " ";
    if(totalEntree > 0){
        facture+=" <b>Entrée = </b>"+totalEntree.toFixed(2)+"$ ";
        //totalEntree = 0;
    }
    if(totalRepas > 0){
        facture+="   <b>Repas = </b>"+totalRepas.toFixed(2)+"$ ";
        //totalRepas = 0;
    }
    facture+="   <b>totalTaxes = </b>"+totalTaxes.toFixed(2)+"$ ";
    facture+="<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;À PAYER = </b>"+totalFacture.toFixed(2)+"$";
    document.getElementById('facture').innerHTML = facture;
}