let chargement = () => {
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}

let evaluer = () => {
    let exp = document.getElementById('exp').value;
    let expValuee = eval(exp);
    if (document.getElementById('reponse').value == expValuee){
        document.getElementById('message').value = "bonne réponse!";
    }else{
        document.getElementById('message').value = "réponse fausse... corrige";
    }
}

let donnerReponse = () => {
    let exp = document.getElementById('exp').value;
    let expValuee = eval(exp);
    document.getElementById('message').value = "la bonne réponse est "+expValuee;
}

let effacer = () => {
    document.getElementById('reponse').value = document.getElementById('reponse').placeholder
    document.getElementById('message').value = null;
}

let chargementSelect = () => {
    let selFilms = document.getElementById('selFilms');
    selFilms.options[selFilms.options.length] = new Option("Sélectionner un film");
    listeFilms.forEach(unFilm => {
        selFilms.options[selFilms.options.length] = new Option(unFilm.Title, unFilm.Title.substring(0,3));
    });
    listerTousLesFilms(listeFilms);
}

let listerFilm = (filmChoisit) =>{
    let contenuTable = `
    <div id='divLst'> 
        <table class="table table-primary table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">ANNÉE</th>
                <th scope="col">DIRECTEUR</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>${filmChoisit.Year}</td>
                <td>${filmChoisit.Director}</td>
                </tr>           
            </tbody>
        </table>
        </div>
    `;
    document.getElementById('contenu').innerHTML = contenuTable;
}

let listerTousLesFilms = (listeFilms) =>{
    let contenuTable = `
    <div id='divLst'> 
    <table class="table table-primary table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">TITRE</th>
                <th scope="col">ANNÉE</th>
                <th scope="col">DIRECTEUR</th>
                </tr>
            </thead>
            <tbody>
        `;
       
        listeFilms.forEach(unFilm => {
            contenuTable += `
                <tr>
                <td>${unFilm.Title}</td>
                <td>${unFilm.Year}</td>
                <td>${unFilm.Director}</td>
                </tr>
            `;
        });        
        contenuTable += `             
            </tbody>
        </table>
        </div>
    `;
    document.getElementById('contenu').innerHTML = contenuTable;
}

let afficherInfosFilm = () => {
    let selFilms = document.getElementById('selFilms');
    let filmChoisit = listeFilms[selFilms.selectedIndex-1];
    listerFilm(filmChoisit);
}