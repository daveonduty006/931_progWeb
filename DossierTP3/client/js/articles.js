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
    document.getElementById('titreEntree').innerHTML = modifierTitre(objEntree.titre);
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
    document.getElementById('titreRepas').innerHTML = modifierTitre(objRepas.titre);
    document.getElementById('prixRepas').innerHTML = objRepas.prix+"$";
    //Calcul de la facture pour le repas
    totalRepas = objRepas.prix;
    totalTaxes = (totalRepas+totalEntree)*TAXES;
    totalFacture = totalRepas+totalEntree+totalTaxes;
    totalFacturePayer();
}

let modifierTitre = (titre) => {
    let titreRetourne = "";
    if(titre.length == 33){
        titreRetourne += titre;
    }
    if(titre.length > 33){
        titreRetourne += titre.substring(0,34);
    }
    if(titre.length < 33){
        titreRetourne += `${titre}<br>&nbsp`;
    }
    return titreRetourne;
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