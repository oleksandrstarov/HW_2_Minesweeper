
describe('View manipulations', function(){
    it('Checks elements hiding and showing', function(){
        
        var element = document.createElement('div');
        element.setAttribute('id', 'mainMenu');
        document.body.appendChild(element);
        
        
        hideElement('mainMenu');
        assert.equal(element.hasAttribute('hidden'), true);
        showElement('mainMenu');
        assert.equal(element.hasAttribute('hidden'), false);

    });
    
    it('Checks that container cleared', function(){
        
        var elementContainer = document.createElement('div');
        elementContainer.setAttribute('class', 'container');
        document.body.appendChild(elementContainer);
        
        for(var i = 0; i < 10; i++){
            var element = document.createElement('div');
            elementContainer.appendChild(element);
        }
        
        

        assert.equal(elementContainer.hasChildNodes(), true);
        resetContainer();
        assert.equal(elementContainer.hasChildNodes(), false);

    });
});

describe('Generation of play field', function(){
    
    it('Should set bombs left onto screen', function(){
        var bombsLeft = 10;
        var element = document.createElement('div');
        element.setAttribute('id', 'bombsLeft');
         document.body.appendChild(element);
    
        setBombsLeft(bombsLeft);
        assert.equal(parseInt(element.innerHTML), bombsLeft);
    });
    
    
    it('Should create new element cell', function(){
        assert.equal(createCell(0, 0).getAttribute('class'), 'cell');
        
    });
    
    it('Should generate random numeric value that not exceeds parameter value', function(){
        var limit = 10;
        var randomNumber = getRandomCoordinates(limit);
        assert.isNotNaN(randomNumber, 'randomNumber is not NaN');
        assert.isAtMost(randomNumber, limit);
    });
    
    
});


describe('Cell manipulation logic', function(){
    var element = document.createElement('div');
    beforeEach(function(){
        element = document.createElement('div');
        element.innerHTML = 'X';
        document.body.appendChild(element);
    });
    
    it('Should update Game Settings', function(){

        element.innerHTML = 'X';
        assert.equal(hasFlag(element), true);

    });
    
    it('Should Swap flag', function(){
        swapFlag(element);
        assert.equal(hasFlag(element), false);
        swapFlag(element);
        assert.equal(hasFlag(element), true);
    });
   
    
});