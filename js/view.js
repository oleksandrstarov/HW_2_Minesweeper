"use strict";

function hideElement(elementId){
    var element = document.getElementById(elementId);
    if(element){
        element.setAttribute("hidden", '');
    }
    
}

function showElement(elementId){
    var element = document.getElementById(elementId);
    if(element){
         element.removeAttribute("hidden");
    }
   
}

function resetContainer(){
    var element = document.getElementsByClassName('container')[0];
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}