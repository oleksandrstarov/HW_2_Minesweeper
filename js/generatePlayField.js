"use strict";



function generatePlayField(gameSettings, container){
    var cellsArray = [];
    
    for(var cellX=0; cellX<gameSettings.width; cellX++){
        cellsArray.push([]);
        for(var cellY=0; cellY<gameSettings.height; cellY++){
            var element = createCell(cellX, cellY);
            container.appendChild(element);
            cellsArray[cellX].push(element);
        }
    }
    var elementMargin = -1;
    container.style.width = (element.offsetWidth + elementMargin) * gameSettings.width + 'px';
    
    cellsArray = setBombs(cellsArray, gameSettings.bombsAmaunt);
    
    return cellsArray;
}

function createCell(x, y){
    var element = document.createElement('div');
    element.setAttribute('class', 'cell');
    element.setAttribute("row", x);
    element.setAttribute("column", y);
    element.onclick = function(){
      clickHandler(this);
    }
    return element;
}


function setBombs(cellsArray, bombsAmaunt){
    console.log(bombsAmaunt);
    while(bombsAmaunt){
        
        var row = getRandomCoordinates(cellsArray.length);
        var column = getRandomCoordinates(cellsArray.length);
        console.log(row);
        
        if(cellsArray[row][column].getAttribute('value') != '*'){
          cellsArray[row][column].innerHTML= '*';
          cellsArray[row][column].setAttribute('value','*');
          //setMarks(row, column);
        }
        else continue;
        
        bombsAmaunt--;
    }
    return cellsArray;
}

function getRandomCoordinates(fieldHeight){
    return Math.floor(Math.random() * fieldHeight);
}

/*function setMarks(row, column){
    var cellObject = cellsArray[row][column];
    //cross
    setCellValue(row, column-1);
    setCellValue(row, column+1);
    setCellValue(row-1, column);
    setCellValue(row+1, column);
    //diagonal
    setCellValue(row-1, column-1);
    setCellValue(row-1, column+1);
    setCellValue(row+1, column-1);
    setCellValue(row+1, column+1);

    function setCellValue(row, column){

      if(cellsArray.length <= row
        || row < 0
        || cellsArray[0].length <= column
        || column < 0
        || cellsArray[row][column].getAttribute('value') == "*"){
         return null; 
        }
      

      var currentCellValue = 0;
      var elementValue = cellsArray[row][column].getAttribute('value');
      if(elementValue)currentCellValue = Number.parseInt(elementValue);

      //elementsArray[row][column].innerHTML = currentCellValue + 1;
      cellsArray[row][column].setAttribute('value', currentCellValue + 1);
    }
  }*/
