let calculer = () => {
    let exp = document.getElementById('exp').value;
    let expValuee = eval(exp);
    document.getElementById('res').value = expValuee;
    document.getElementById('spres').innerHTML ="<strong>"+expValuee+"</strong>";
}

let listerAnimaux = (listeAnimaux) =>{
    //Lister les animaux
    let contenuTable = `
    <div id='divLst'>
    <i class="bi bi-file-excel" onClick="$('#divLst').toggle();"></i>   
    <table class="table table-primary table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">NOM</th>
                <th scope="col">PAYS</th>
                <th scope="col">MESURE</th>
                <th scope="col">POIDS</th>
                </tr>
            </thead>
            <tbody>
        `;
       
        listeAnimaux.forEach(unAnimal => {
            contenuTable += `
                <tr>
                <td>${unAnimal.nom}</td>
                <td>${unAnimal.pays}</td>
                <td>${unAnimal.mesure}</td>
                <td>${unAnimal.poids}</td>
                </tr>
            `;
        });        
        contenuTable += `             
            </tbody>
        </table>
        </div>
    `;
        return contenuTable;
}

let montrerListeAnimaux = (listeAnimaux) => {
    document.getElementById('contenu').innerHTML = listerAnimaux(listeAnimaux);
}

let chargement = () => {
    //Créer select des animaux
    let selAnimaux = document.getElementById('selAnimaux');
    selAnimaux.options[selAnimaux.options.length] = new Option("Sélectionner un animal");
    animaux.forEach(unAnimal => {
        selAnimaux.options[selAnimaux.options.length] = new Option(unAnimal.nom, unAnimal.nom.substring(0,3));
    });
    
    montrerListeAnimaux(animaux);
}

let afficherInfosAnimal = () => {
    let selAnimaux = document.getElementById('selAnimaux');
    //let nom = selAnimaux.options[selAnimaux.selectedIndex].text;
    let animalChoisit = animaux[selAnimaux.selectedIndex-1];
    // let reponse = `
    //     <p>PAYS = ${animalChoisit.pays}</p>
    //     <p>MESURE = ${animalChoisit.mesure}</p>
    //     <p>POIDS = ${animalChoisit.poids}</p>
    // `;
     montrerListeAnimaux([animalChoisit]);
}