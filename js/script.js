"use strict";

var gameSettings = {
  width: 0,
  height: 0,
  bombsAmaunt: 0,
  cellsArray: []
}

function initGame(fieldDimension, bombsAmaunt){
  var cellsContainer = document.getElementsByClassName('container')[0];
  hideButtons();
  
  gameSettings.height = fieldDimension;
  gameSettings.width = fieldDimension;
  gameSettings.bombsAmaunt = bombsAmaunt;
  console.log(gameSettings);
  gameSettings.cellsArray = generatePlayField(gameSettings, cellsContainer);

}


function clickHandler(element, row, column){
  showCellValue(element);
  
  if(hasMine(element)){
    endGame();
  }
  
  if(!element.hasAttribute('value')){
    openZone(element, row, column);
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
  alert("You Loose!");
  for(var row = 0; row < gameSettings.cellsArray.length; row++){
    for(var column = 0; column < gameSettings.cellsArray[row].length; column++){
      showCellValue(gameSettings.cellsArray[row][column]);
      if(gameSettings.cellsArray[row][column].hasAttribute('value')){
        gameSettings.cellsArray[row][column].innerHTML = gameSettings.cellsArray[row][column].getAttribute('value');
      }
    }
  }
}

function showCellValue(element){
  element.setAttribute('clicked', '');
}

function hasMine(element){
  if(element.getAttribute('value') == "*"){
    return true; 
  }
  return false;
  
}
