let calculer = () => {
    let exp = document.getElementById('exp').value;
    let expValuee = eval(exp);
    document.getElementById('res').value = expValuee;
    document.getElementById('spres').innerHTML ="<strong>"+expValuee+"</strong>";
}