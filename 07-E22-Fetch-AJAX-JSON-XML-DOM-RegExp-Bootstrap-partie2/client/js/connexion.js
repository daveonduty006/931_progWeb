let connexion = [
    {"id":1,"courriel":"curie@gmail.com", "pass":"12345","statut":"I","role":"M"},
    {"id":2,"courriel":"bond@gmail.com", "pass":"12345","statut":"A","role":"M"}
];

let seConnecter = () => {
     let courriel = document.getElementById('courrielc').value;
     let pass = document.getElementById('passc').value;
     let msgErr="";
     for(let uneConnexion of connexion){
        if(uneConnexion.courriel == courriel && uneConnexion.pass == pass){
            if(uneConnexion.statut == "A") {
                window.open('client/pages/membre.html');
            } else {
                msgErr="Impossible de vous connecter. Contactez l'administrateur.";
                break;
            }
        }
     }
     if(msgErr.length == 0){
        msgErr="Vérifiez vos paramètres de connexion.";
     }
     document.getElementById('formConnexionErr').innerHTML = msgErr;
}