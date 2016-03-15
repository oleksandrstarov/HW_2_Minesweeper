"use strict";

var gameSettings = {
  width: 0,
  height: 0,
  bombsAmaunt: 0,
  cellsArray: []
}

function initGame(fieldDimension, bombsAmaunt){
  gameSettings.height = fieldDimension;
  gameSettings.width = fieldDimension;
  gameSettings.bombsAmaunt = bombsAmaunt;
  console.log(gameSettings);
  startGame(gameSettings);
}

function startGame(gameSettings){
  var cellsContainer = document.getElementsByClassName('container')[0];
  hideElement('mainMenu');
  gameSettings.cellsArray = generatePlayField(gameSettings, cellsContainer);
  showElement('gameMenu');
}

function cancelGame(){
  resetContaier();
  hideElement('gameMenu');
  showElement('mainMenu');
}

function restartGame(){
  resetContaier();
  startGame(gameSettings);
}

function leftClickHandler(element, row, column){
  if(hasFlag(element)){
    updateBombsLeft(1);
  }
  showCellValue(element);
  
  if(hasMine(element)){
    endGame();
  }
  
  if(!element.hasAttribute('value')){
    openZone(element, row, column);
  }
}

function rightClickHandler(element, event){
  preventContextMenu(event);
  if(!element.hasAttribute('clicked')){
    swapFlag(element);
  }
}

function swapFlag(element){
  if(element.innerHTML == "X"){
    element.innerHTML = '';
    updateBombsLeft(1);
  }else{
    element.innerHTML = 'X';
    updateBombsLeft(-1);
  }
}

function updateBombsLeft(amount){
  var element = document.getElementById('bombsLeft');
  element.innerHTML = parseInt(element.innerHTML) + amount;
}

function preventContextMenu(event){
    if(event.preventDefault != undefined){
    event.preventDefault();
  }

  if(event.stopPropagation != undefined){
    event.stopPropagation();
  }
}


function openZone (element, row, column){
  console.log('Zone row ' + row +' column ' + column);
  
  for(var rowShift = -1; rowShift <= 1; rowShift++){
    for(var columnShift = -1; columnShift <= 1; columnShift++){
      
      if(rowShift == 0 && columnShift == 0){
        continue;
      }
      
      var currentRow = row + rowShift;
      var currentColumn = column + columnShift;
      
      if(validateCellPositionAndContent(currentRow, currentColumn, gameSettings.cellsArray)){
        var currentCell = gameSettings.cellsArray[currentRow][currentColumn];
        if(hasFlag(currentCell)){
          swapFlag(currentCell);
        }
        if(!currentCell.hasAttribute('clicked')){
          
          showCellValue(currentCell);
          
          if(!currentCell.hasAttribute('value')){
            openZone(currentCell, currentRow, currentColumn);
          }
        }
      }
    }
  }
}


function endGame(){
  alert('You Loose!');
  for(var row = 0; row < gameSettings.cellsArray.length; row++){
    for(var column = 0; column < gameSettings.cellsArray[row].length; column++){
      showCellValue(gameSettings.cellsArray[row][column]);
    }
  }
}

function showCellValue(element){
  element.setAttribute('clicked', '');
  if(element.hasAttribute('value')){
    element.innerHTML = element.getAttribute('value');
  }
}

function hasMine(element){
  if(element.getAttribute('value') == '*'){
    return true; 
  }
  return false;
}

function hasFlag(element){
  if(element.innerHTML == 'X'){
    return true; 
  }
  return false;
}
