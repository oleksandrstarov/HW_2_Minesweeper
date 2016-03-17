"use strict";



function generatePlayField(gameSettings, container){
    var cellsArray = [];
    
    for(var cellX = 0; cellX<gameSettings.width; cellX++){
        cellsArray.push([]);
        
        for(var cellY = 0; cellY<gameSettings.height; cellY++){
            
            var element = createCell(cellX, cellY);
            container.appendChild(element);
            cellsArray[cellX].push(element);
        }
    }
    updateContainer(container, element, gameSettings.width);
    cellsArray = setBombs(cellsArray, gameSettings.bombsAmount);
    setBombsLeft(gameSettings.bombsAmount);
    return cellsArray;
}

function updateContainer(container, element, cellsInRow){
    var elementMargin = -1;
    container.style.width = (element.offsetWidth + elementMargin) * cellsInRow + 'px';
    container.style.height = container.style.width;
}

function setBombsLeft(bombsLeft){
    var element = document.getElementById('bombsLeft');
    element.innerHTML = bombsLeft;
}

function createCell(x, y){
    var element = document.createElement('div');
    element.setAttribute('class', 'cell');

    element.onclick = function(e){
        leftClickHandler(this, x, y);
    }
    
    element.oncontextmenu = function(event){
        rightClickHandler(this, event);
    }
    return element;
}


function setBombs(cellsArray, bombsAmount){
    while(bombsAmount){
        
        var row = getRandomCoordinates(cellsArray.length);
        var column = getRandomCoordinates(cellsArray.length);
        
        if(cellsArray[row][column].getAttribute('value') != '*'){
            
            cellsArray[row][column].setAttribute('value','*');
            setMarksAroundCell(row, column, cellsArray);
        }
        else{
            continue;
        } 
        bombsAmount--;
    }
    return cellsArray;
}

function getRandomCoordinates(fieldHeight){
    return Math.floor(Math.random() * fieldHeight);
}

function setMarksAroundCell(row, column, cellsArray){
    for(var rowShift = -1; rowShift <= 1; rowShift++){
        for(var columnShift = -1; columnShift <= 1; columnShift++){
            
            var targetRow = row + rowShift;
            var targetColumn = column + columnShift;
            
            if(rowShift === 0 && columnShift === 0){
                continue;
            }
            
            if(validateCellPositionAndContent(targetRow, targetColumn, cellsArray)){
                setCellValue(targetRow, targetColumn, cellsArray);
            }
        }
    }
}

function validateCellPositionAndContent(row, column, cellsArray){
    if(row < 0 || column < 0
    || row > cellsArray.length - 1 || column > cellsArray.length - 1
    || hasMine(cellsArray[row][column])){
        return false;
    }else{
        return true;
    }
}

function setCellValue(row, column, cellsArray){
    if(cellsArray[row][column].hasAttribute('value')){
        var currentCellValue = parseInt(cellsArray[row][column].getAttribute('value'));
    }else{
        var currentCellValue = 0;
    }
    cellsArray[row][column].setAttribute('value', currentCellValue + 1);
}