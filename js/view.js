"use strict";

function hideElement(elementId){
    var element = document.getElementById(elementId);
    element.setAttribute("hidden", '');
}

function showElement(elementId){
    var element = document.getElementById(elementId);
    element.removeAttribute("hidden");
}

function resetContaier(){
    var element = document.getElementsByClassName('container')[0];
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}