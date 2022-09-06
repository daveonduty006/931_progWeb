let creerSelects = () => {
    remplirSelPays();
    remplirSelProgrammes();
}

let remplirSelPays = () => {
    let selPays = document.getElementById('selPays');
    let tmpPays = []; 
    for(let unPays of listeEtudiants){
        if(tmpPays.indexOf(unPays.Country) == -1){
            tmpPays.push(unPays.Country)
        }
    }
    for(let nomPays of tmpPays){
        selPays.options[selPays.options.length] = new Option(nomPays);
    }
}

let remplirSelProgrammes = () => {
    let selProgrammes = document.getElementById('selProgrammes');
    let tmpProgrammes = []; 
    for(let unProgramme of listeEtudiants){
        if(tmpProgrammes.indexOf(unProgramme.Major) == -1){
            tmpProgrammes.push(unProgramme.Major)
        }
    }
    for(let nomProgramme of tmpProgrammes){
        selProgrammes.options[selProgrammes.options.length] = new Option(nomProgramme);
    }
}

let lister = (pour, nomDePour) => {
    let rep = listerEntete(pour, nomDePour);
    rep+=`<tbody>`;
    let compteur=0;
    let totalDesNotes=0;
    let moyenne;
    for(let unEtudiant of listeEtudiants){
        if(pour=='C'){
            if(unEtudiant.Country==nomDePour){
                rep+=`<tr>
                        <td>${unEtudiant.ID}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.LastName}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.FirstName}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.City}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.State}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Gender}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.StudentStatus}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Major}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Country}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Age}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.SAT}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Grade}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Height}&nbsp;&nbsp;</td>`;
            }
        }else if(pour=='M'){
            if(unEtudiant.Major==nomDePour){
                compteur+=1;
                totalDesNotes+= parseInt(unEtudiant.Grade); 
                moyenne= (totalDesNotes/compteur).toFixed(2);               
                rep+=`<tr>
                        <td>${unEtudiant.ID}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.LastName}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.FirstName}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.City}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.State}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Gender}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.StudentStatus}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Major}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Country}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Age}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.SAT}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Grade}&nbsp;&nbsp;</td>
                        <td>${unEtudiant.Height}&nbsp;&nbsp;</td>`;
            }
        }else{
            rep+=`<tr>
                    <td>${unEtudiant.ID}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.LastName}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.FirstName}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.City}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.State}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.Gender}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.StudentStatus}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.Major}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.Country}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.Age}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.SAT}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.Grade}&nbsp;&nbsp;</td>
                    <td>${unEtudiant.Height}&nbsp;&nbsp;</td>`;
        }
        rep+=`</tr>`;  
    }
    rep+=`</tbody></table>`;
    if(pour=='M'){
        rep+=`<br><b>Moyenne du programme: ${moyenne}</b>`;
    }
    document.getElementById('contenu').innerHTML = rep;
}

let listerEntete = (pour, nomDePour) => {
    let rep = `<table>`;
        if(pour=='C'){
            rep += `<caption>LISTE DES ÉTUDIANTS DONT LE PAYS D'ORIGINE EST ${nomDePour}</caption>
                    <tr>
                        <th>ID&nbsp;&nbsp;</th>
                        <th>Nom&nbsp;&nbsp;</th>
                        <th>Prénom&nbsp;&nbsp;</th>
                        <th>Ville&nbsp;&nbsp;</th>
                        <th>État&nbsp;&nbsp;</th>
                        <th>Genre&nbsp;&nbsp;</th>
                        <th>Status d'Étudiant&nbsp;&nbsp;</th>
                        <th>Programme&nbsp;&nbsp;</th>
                        <th>Pays&nbsp;&nbsp;</th>
                        <th>Âge&nbsp;&nbsp;</th>
                        <th>SAT&nbsp;&nbsp;</th>
                        <th>Note&nbsp;&nbsp;</th>
                        <th>Hauteur&nbsp;&nbsp;</th>`;
        }else if(pour=='M'){
            rep += `<caption>LISTE DES ÉTUDIANTS DONT LE PROGRAMME D'ÉTUDE EST ${nomDePour}</caption>
                    <tr>
                        <th>ID&nbsp;&nbsp;</th>
                        <th>Nom&nbsp;&nbsp;</th>
                        <th>Prénom&nbsp;&nbsp;</th>
                        <th>Ville&nbsp;&nbsp;</th>
                        <th>État&nbsp;&nbsp;</th>
                        <th>Genre&nbsp;&nbsp;</th>
                        <th>Status d'Étudiant&nbsp;&nbsp;</th>
                        <th>Programme&nbsp;&nbsp;</th>
                        <th>Pays&nbsp;&nbsp;</th>
                        <th>Âge&nbsp;&nbsp;</th>
                        <th>SAT&nbsp;&nbsp;</th>
                        <th>Note&nbsp;&nbsp;</th>
                        <th>Hauteur&nbsp;&nbsp;</th>`;
        }else{
            rep += `<caption>LISTE DE TOUT LES ÉTUDIANTS</caption>
                    <tr>
                        <th>ID&nbsp;&nbsp;</th>
                        <th>Nom&nbsp;&nbsp;</th>
                        <th>Prénom&nbsp;&nbsp;</th>
                        <th>Ville&nbsp;&nbsp;</th>
                        <th>État&nbsp;&nbsp;</th>
                        <th>Genre&nbsp;&nbsp;</th>
                        <th>Status d'Étudiant&nbsp;&nbsp;</th>
                        <th>Programme&nbsp;&nbsp;</th>
                        <th>Pays&nbsp;&nbsp;</th>
                        <th>Âge&nbsp;&nbsp;</th>
                        <th>SAT&nbsp;&nbsp;</th>
                        <th>Note&nbsp;&nbsp;</th>
                        <th>Hauteur&nbsp;&nbsp;</th>`;
        }
        rep+=`</tr>`;
    return rep;
}

let listerEtudiantsSelonPays = () => {
    let selPays = document.getElementById('selPays');
    let paysChoisi = selPays.options[selPays.selectedIndex].text;
    lister('C', paysChoisi);
}

let listerEtudiantsSelonProgramme = () => {
    let selProgrammes = document.getElementById('selProgrammes');
    let programmeChoisi = selProgrammes.options[selProgrammes.selectedIndex].text;
    lister('M', programmeChoisi);
}