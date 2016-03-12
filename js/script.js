var element = document.getElementsByClassName('cell')[0];


//assume that we have matrix with even amount of rows
var elementsArray = [[]];
var x = 0;
var row = 0;
var bombs = 3;
var elements = 0;

while(element){
  var element = document.getElementsByClassName('cell')[elements];
  if(element) {
    if(x != 0 && x != element.getBoundingClientRect().top){
      row++;
      elementsArray.push([]);
    }
    elementsArray[row].push(element);
    element.setAttribute("row", row);
    element.setAttribute("column", elementsArray[row].length-1);
    element.onclick = function(){
      clickHandler(this);
    }
    x = element.getBoundingClientRect().top;
  }
  elements++;
}



setBombs();
function setBombs(){
  while(bombs){
    var row = Math.floor((Math.random() * elementsArray.length));
    var column = Math.floor((Math.random() * elementsArray[0].length));

    // to be changed to attributes
    if(elementsArray[row][column].getAttribute('value') != '*'){
      //elementsArray[row][column].innerHTML= '*';
      elementsArray[row][column].setAttribute('value','*');
      setMarks(row, column);
    }
    else continue;
    bombs--;
  }

  function setMarks(row, column){
    var cellObject = elementsArray[row][column];
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

      if(elementsArray.length <= row
        || row < 0
        || elementsArray[0].length <= column
        || column < 0) return null;
      if(elementsArray[row][column].getAttribute('value') == "*") return null;

      var currentCellValue = 0;
      var elementValue = elementsArray[row][column].getAttribute('value');
      if(elementValue)currentCellValue = Number.parseInt(elementValue);

      //elementsArray[row][column].innerHTML = currentCellValue + 1;
      elementsArray[row][column].setAttribute('value', currentCellValue + 1);
    }
  }

}

function clickHandler(element){
  var clickedRow = element.getAttribute('row');
  var clickedColumn = element.getAttribute('column');
  console.log(element +" " + clickedRow + " " + clickedColumn);

  var isClicked = element.hasAttribute('clicked');
  //change cell color
  if(showCellValue(element) == false){
    endGame();
    return null;
  }
  //check all empty fields
  if(!element.getAttribute('value') && !isClicked) openZone(element);


}
var callCounter = 0;
var openZone = function (element){
  console.log('row ' + element.getAttribute('row') +' column ' +element.getAttribute('column'));
  for(var i = -1; i<=1; i++){
    for(var j = -1; j<=1; j++){
      if(i == 0 && j == 0) continue;
      var curRow = Number.parseInt(element.getAttribute('row')) + i;
      var curColumn = Number.parseInt(element.getAttribute('column')) + j;

      if(curRow < 0
      || curRow >= elementsArray.length
      || curColumn < 0
      || curColumn >= elementsArray[0].length) continue;

      if(elementsArray[curRow][curColumn].hasAttribute('clicked')) continue;
      elementsArray[curRow][curColumn].setAttribute('clicked', '');
      showCellValue(elementsArray[curRow][curColumn]);
      callCounter++;
      if(elementsArray[curRow][curColumn].getAttribute('value') == null)openZone(elementsArray[curRow][curColumn]);
    }
  }
  console.log(callCounter)
}

function endGame(){
  alert("You Loose!");
  for(var i = 0; i < elementsArray.length; i++){
    for(var j = 0; j < elementsArray[i].length; j++){
      elementsArray[i][j].setAttribute('clicked', '');
      elementsArray[i][j].innerHTML = elementsArray[i][j].getAttribute('value');
    }
  }
}

function showCellValue(element){
  element.setAttribute('clicked', '');
  element.innerHTML = element.getAttribute('value');
  if(element.getAttribute('value') == "*") return false;
  return true;
}
