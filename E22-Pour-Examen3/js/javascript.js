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
    //Prendre le select de la page index.html qu'a comme id selProduits
    let selProduits = document.getElementById('selProduits');
    //Nous allons prendre le texte de l'option qu'a été choisie soit le nom du produit.
    //Pour ce faire nous allons dans le tableau options du select en question selProduits.options
    //et à l'indice donné par par l'option que l'utilisateur a choisi. L'indice de l'option choisie est
    //placé toujours dans une propriété du select nommée selectedIndex et dans notre cas pour l'avoir
    //il faut passer par notre select ce qui donne selProduits.selectedIndex. À la fin on recupére
    //de selProduits.options[selProduits.selectedIndex] l'objet de la classe Option et de cet objet
    //nous allons chercher la propriété text, qu'est dans ce cas-ci le nom du produit choisi. Le nom de ce 
    //produit on va le mettre dans la variable produitChoisi. Nous allons appeler après la 
    //fonction lister en envoyant comme valeur P puisque nous voulons lister les clients
    //qu'ont acheté ce produit produitChoisi.
    let produitChoisi = selProduits.options[selProduits.selectedIndex].text;
    lister('P', produitChoisi);//P-Pour un produit donné
}

//Voir les commentaires pour listerCommandesSelonProduit
let listerCommandesSelonClient = () => {
    let selClients = document.getElementById('selClients');
    let clientChoisi = selClients.options[selClients.selectedIndex].text;
    lister('C',clientChoisi);//C-Pour un client donné
}

//Permet de calculer le total des commandes selon la valeur du Qtr (1,2,3,4) choisi dans
//le select selTotal 
let calculerTotal = () => {
    //Recupérer le select selTotal définit dans la page index.html.
    let selTotal = document.getElementById('selTotal');
    //Recupére l'option choisie. Voir commentaires dans listerCommandesSelonProduit
    let optionChoisie = selTotal.options[selTotal.selectedIndex].text;
    let total=0, montant;
    //Parcour de toutes les commandes
    for(let unProduit of listeCommandes){
        if (optionChoisie != 'Tous'){//Le choix dans le select a été soit 1,2,3 ou 4
            //Ici ont construit le bon Qtr selon le choix fait dans le select. Ceci pour cibler le
            //bon attribut de unProduit pour faire le calcul. Exemple : si nous avions choisit l'option 2 
            // alors la variable option va avoir comme valeur "Qtr 2" et donc nous voulons calculer le total
            //des commandes pour les produits qu'on une valeur pour "Qtr 2".
            let option="Qtr "+optionChoisie;
            //Nous allons tester su l'objet unProduit à la propriété "Qtr 2" donc différent de undefined.
            //Si tel est le cas alors la valeur pourra ête par exemple $1,750.20
            //Comme nous devons faire des calculs il faut retirer le $ ainsi que la , (virgule).
            if(unProduit[option] != undefined){
                //Nous allons chercher dans la valeur le texte à partir de la position 1
                //et le mettre dans la variable montant ce qui va donner selon l'exemple 1,750.20.
                montant=unProduit[option].substring(1);
                //Faudra maintenant enlever la , du nombre puisque c'est un format d'affoichage seulement.
                //On va utiliser montant.replace(',','') qui va prendre le string montant et qui 
                //va remplacer ',' par rien '' (pas un espace les deux ' collés).
                //Ce qui va donner dans la variable montant et selon notre exemple 1750.20
                //Montant ce string à le bon format d'un nombre réel. On va donc le convertir
                //en utisant parseFloat et le mettre dans montant qui n'est plus un string mais un float et
                //on pourra alors faire nos calculs.
                montant=parseFloat(montant.replace(',',''));
                //Ajouter ce montant au total.
                total+=montant;
            }
        } else {//Le choix dans le select a été Tous on fait la même chose mais pour tous les Qtr (1,2,3,4).
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
    //Mettre le total avec 2 décilames suivi de $.
    let rep = "Total = "+total.toFixed(2)+"$";
    //Présenter le résultat dans notre page index.html à l'intérieur de
    //l'élément de id conetnu.
    document.getElementById('contenu').innerHTML = rep;
}
