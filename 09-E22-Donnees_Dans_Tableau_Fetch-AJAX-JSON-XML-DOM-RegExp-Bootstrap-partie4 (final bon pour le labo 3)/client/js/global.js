let basculerVisibilteModal = (idModal, etatFR) => {
  let idModalJQ = "#"+idModal;
  let etatEN = (etatFR == 'montrer')?'show':'hide';
  $(idModalJQ).modal(etatEN);  
}

// let montrerModalEnregistrer = () => {
//    $("#modalEnreg").modal('show');
// }

// let montrerModalConnexion = () => {
//    $("#modalConnexion").modal('show');
// }

// let cacherModalEnregistrer = () => {
//    $("#modalEnreg").modal('hide');
// }

// let cacherModalConnexion = () => {
//    $("#modalConnexion").modal('hide');
// }