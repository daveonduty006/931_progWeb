let sel= ""

let choixSpectacle= () => {
    let tableau= document.getElementById('idSpectacle'); 
    sel= tableau.options[tableau.selectedIndex].value;
    changerIframeSrc();
}

let changerIframeSrc= () => {
    let src= ""
    if (sel == "im"){
        src+= "interets/show_maiden.html"
    }if (sel == "jp"){
        src+= "interets/show_priest.html"
    }if (sel == "bs"){
        src+= "interets/show_sabbath.html"
    }if (sel == "kd"){
        src+= "interets/show_king.html"
    }
    document.getElementById('idIframe').src= src;
}