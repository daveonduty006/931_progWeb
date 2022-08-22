// Nous allons chercher de l'objet tabCommades l'attribut 'Source Data'. 
// Nous ne pouvons pas utiliser 'tabCommandes.' parce que le nom de l'attribut à un espace (à ne pas faire !). 
// Nous y accédons donc comme si tabCommandes était un tableau dont 'Source Data' est un indice (0 ici). 
// Dans d'autres langages cela s'appelle un tableau associatif (les indices sont des strings, ex: hashmap, 
// dictionaire, etc).
let listeCommandes = tabCommandes['Source Data'];

// Appellé dans index.html via l'instruction <body onLoad="chargerListesDeroulantes(); lister('T','');">.
// Nous appellons lister('T','') pour faire apparaître, au chargement de la page, la liste de toutes les
// commandes. 
// Cette fonction est appellée aussi par le bouton du navbar de index.html via l'instruction
// <button onClick="lister('T','');">Lister produits</button>.
let chargerListesDeroulantes = () => {
    remplirSelProduit();
    remplirSelClients();
}

// Permet de remplir le select de id selProduits avec le nom de tous les produits mais sans doublons.
let remplirSelProduit = () => {
    // On récupère le select de la page index.html qui a comme id selProduits.
    let selProduits = document.getElementById('selProduits');
    // Tableau vide pour y placer le nom des produits sans doublons.
    let tmpProduits = []; 
    // On parcours la liste de toutes les commandes du fichier produits.js .
    // Si le produit n'est pas (-1) dans le tableau tmpProduits alors on le place dedans sinon on ne le
    // place pas et ainsi on évite les doublons.
    for(let unProduit of listeCommandes){
        if(tmpProduits.indexOf(unProduit.Product) == -1){
            tmpProduits.push(unProduit.Product)
        }
    }
    // On créé les options du select selProduits à partir de notre tableau tmpProduits.
    for(let nomProduit of tmpProduits){
        selProduits.options[selProduits.options.length] = new Option(nomProduit);
    }
}

// Permet de remplir le select de id selClients avec le nom de tous les clients mais sans doublons.
// Mêmes commentaires que remplirSelProduits().
let remplirSelClients = () => {
    let selClients = document.getElementById('selClients');
    let tmpClients = [];
    for(let unClient of listeCommandes){
        if(tmpClients.indexOf(unClient.Customer) == -1){
            tmpClients.push(unClient.Customer)
        }
    }
    for(let nomClient of tmpClients){
        selClients.options[selClients.options.length] = new Option(nomClient);
    }
}

// // Le paramètre 'pour' est soit P, C ou T.
let lister = (pour, nomDePour) => {
    let rep2="";
    // Le paramètre'nomDePour' est soit le nom du produit ou le nom du client.
    let rep = listerEntete(pour, nomDePour);
    rep+=`<tbody>`;
    for(let unProduit of listeCommandes){
        // Nous utilisons ici dans la variable rep2 la valeur retournée par la fonction.
        // Si elle est différente de vide alors nous mettons son contenu dans rep pour l'affichage et  
        // l'on créé les 4 autres colonnes. 
        rep2 = afficherPremieresColonnesSelonPour(pour, nomDePour, unProduit);
        if( rep2 != ""){
            rep+=rep2;
            if(unProduit['Qtr 1'] != undefined){
                rep+=`<td>${unProduit['Qtr 1']}</td>`;
            } else {
                rep+=`<td></td>`;
            }    
            if(unProduit['Qtr 2'] != undefined){
                rep+=`<td>${unProduit['Qtr 2']}</td>`;
            } else {
                rep+=`<td></td>`;
            } 
            if(unProduit['Qtr 3'] != undefined){
                rep+=`<td>${unProduit['Qtr 3']}</td>`;
            } else {
                rep+=`<td></td>`;
            } 
            if(unProduit['Qtr 4'] != undefined){
                rep+=`<td>${unProduit['Qtr 4']}</td>`;
            } else {
                rep+=`<td></td>`;
            }
            rep+=`</tr>`;  
        }
    }
    rep+=`</tbody></table>`;
    // Quand l'on a fini de passer à travers tout les objets du tableau listeCommandes nous prenons
    // le résultat de 'rep' et nous le déposons comme étant le contenu innerHTML de l'élément de notre 
    // page qui a comme id contenu et ainsi le résultat va apparaître.
    document.getElementById('contenu').innerHTML = rep;
}

// Permet d'afficher le bon entête selon la valeur de 'pour' et la valeur de 'nomDePour' 
// (aka l'option que l'on a choisi dans le select en question). 
// Exemple si la valeur du paramètre 'pour' est T alors la fonction fera évidemment afficher 
// l'entête valide pour toute la liste.
let listerEntete = (pour, nomDePour) => {
    let rep = `
        <table border=1>
        `;
        if(pour=='P'){
            rep += `
                <caption>LISTE DES CLIENTS QU'ONT COMMANDÉ LE PRODUIT ${nomDePour}</caption>
                <tr><th>Client</th>
            `;
        } else if(pour=='C'){
            rep += `
                <caption>LISTE DES PRODUITS COMMANDÉS PAR LE CLIENT ${nomDePour}</caption>
                <tr><th>Produit</th>
            `;
        }else {
                rep += `
                <caption>LISTE DE TOUTES LES COMMANDES</caption>
                <tr><th>Produit</th><th>Client</th>
                `;
        }
        rep+=`<th>Qtr 1</th><th>Qtr 2</th><th>Qtr 3</th><th>Qtr 4</th></tr>`;
    return rep;
}

// Permet de déterminer la valeur à afficher dans la première colonne dans le cas où 'pour' est égal à 
// P ou C. 
// Dans le cas où 'pour' est égal à T nous affichons alors les deux colonnes, soit produit et client. 
// Le paramètre 'nomDePour' contient le choix fait dans le select des produits ou celui des clients.
// Elle est donc importante pour que nous choisissons le bon objet 'unProduit' qui contiendra 
// la bonne valeur, égale à 'nomDePour'. 
// Pour ceux qui ne seront pas choisis (aka la valeur de leur attribut n'est pas égale à 'nomDePour') 
// la fonction va retourner alors la valeur de rep qui aura alors resté égale à "" (vide) et 
// donc n'apparaîtra pas dans le tableau HTML à afficher.
let afficherPremieresColonnesSelonPour = (pour, nomDePour, unProduit) =>{
    let rep="";
    // Selon la condition on contruit la colonne avec la bonne valeur à afficher selon le cas. 
    // Si aucune condition n'est satisfaite alors on retourne "" (vide) puisque rep="".
    if(pour=='P' && nomDePour == unProduit.Product){
       rep+= `
            <tr>
                <td>${unProduit.Customer}</td>
            `;
    } else if(pour=='C' && nomDePour == unProduit.Customer){
        rep+= `
            <tr>
                <td>${unProduit.Product}</td>
            `;
    } else if (pour=='T'){
        rep+= `
        <tr>
            <td>${unProduit.Product}</td>
            <td>${unProduit.Customer}</td>
        `;
    }
    return rep;
}

let listerCommandesSelonProduit = () => {
    // On récupère le select de la page index.html qui a comme id selProduits.
    let selProduits = document.getElementById('selProduits');
    // Nous prenons ensuite le texte de l'option qui a été choisie soit le nom du produit.
    // Pour ce faire nous allons dans le tableau options du select en question (selProduits.options)
    // et à l'indice donné par le choix de l'utilisateur ( [selProduits.selectedIndex] ). 
    // Nous aurons donc récupéré de selProduits.options[selProduits.selectedIndex] l'objet de la classe 
    // Option de selProduits et de cet objet nous allons chercher la propriété .text, qui dans ce cas-ci 
    // est le nom du produit choisi. 
    // Le nom de ce produit est ensuite mis dans la variable produitChoisi. 
    let produitChoisi = selProduits.options[selProduits.selectedIndex].text;
    // Nous nous servons de notre fonction lister en envoyant la valeur P comme premier paramètre puisque 
    // nous voulons ici lister les clients ayant au cours de l'année acheté le produit (produitChoisi).
    lister('P', produitChoisi);
}

// Mêmes commentaires que remplirSelProduits().
let listerCommandesSelonClient = () => {
    let selClients = document.getElementById('selClients');
    let clientChoisi = selClients.options[selClients.selectedIndex].text;
    // Nous envoyons comme premier paramètre la valeur C puisque nous voulons ici lister toutes les 
    // commandes du client (clientChoisi) effectué au cours de l'année.
    lister('C',clientChoisi);
}

// Permet de calculer le total des commandes selon la valeur du quart (Qtr) de l'année choisi dans le 
// select de id selTotal. 
let calculerTotal = () => {
    // On recupère d'abord le select selTotal définit dans la page index.html.
    let selTotal = document.getElementById('selTotal');
    // On récupère ensuite l'option choisie.
    let optionChoisie = selTotal.options[selTotal.selectedIndex].text;
    let total=0, montant;
    // Parcours de toutes les commandes
    for(let unProduit of listeCommandes){
        // Si le choix dans le select est soit 1, 2, 3 ou 4:
        if (optionChoisie != 'Tous'){
            // On construit le bon Qtr selon le choix fait dans le select. 
            // Nous allons donc cibler le bon attribut de unProduit pour faire le calcul. 
            // Exemple si nous avions choisi l'option 2 alors nous aurions la valeur "Qtr 2" et donc 
            // nous voulons calculer le total des commandes pour les produits ayant une valeur pour 
            // "Qtr 2".
            let option="Qtr "+optionChoisie;
            // Nous allons tester sur l'objet unProduit si la propriété "Qtr 2" est différent de 
            // undefined.
            // Si tel est le cas alors nous allons avoir une valeur qui s'ajoutera à la variable total.
            // Comme nous devons faire des calculs il faut bien sûr retirer le caractère '$' ainsi que la
            // virgule.
            if(unProduit[option] != undefined){
                // Nous allons chercher dans la valeur le texte à partir de la position 1 (saut du '$') et
                // nous le mettons dans la variable montant.
                montant=unProduit[option].substring(1);
                // Nous allons premièrement devoir enlever la virgule de la variable montant via 
                // l'instruction montant.replace(',','').
                // Nous allons pour finir convertir notre variable montant (jusqu'à présent un String) en 
                // une variable de type float.
                montant=parseFloat(montant.replace(',',''));
                // On ajoute notre montant à la variable total.
                total+=montant;
            }
        // Si le choix dans le select est Tous alors on fait la même chose mais pour tous les Qtr.
        } else {
            if(unProduit['Qtr 1'] != undefined){
                montant=unProduit['Qtr 1'].substring(1);
                montant=parseFloat(montant.replace(',',''));
                total+=montant;
            }
            if(unProduit['Qtr 2'] != undefined){
                montant=unProduit['Qtr 2'].substring(1);
                montant=parseFloat(montant.replace(',',''));
                total+=montant;
            }
            if(unProduit['Qtr 3'] != undefined){
                montant=unProduit['Qtr 3'].substring(1);
                montant=parseFloat(montant.replace(',',''));
                total+=montant;
            }
            if(unProduit['Qtr 4'] != undefined){
                montant=unProduit['Qtr 4'].substring(1);
                montant=parseFloat(montant.replace(',',''));
                total+=montant;
            }
        }
    }
    let rep = "Total = "+total.toFixed(2)+"$";
    // On présente finalement le résultat dans notre page index.html à l'intérieur de l'élément 
    // ayant comme id contenu.
    document.getElementById('contenu').innerHTML = rep;
}
