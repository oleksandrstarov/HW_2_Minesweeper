




describe('first test', function(){
    beforeEach(function(){
        var element = document.createElement('div');
        document.body.appendChild(element);
    });
    it('should work', function(){
       assert.equal(true, true);
       //assert.equal(testIt('1'), 1);
       assert.equal(createCell(0,0).tagName, 'DIV');
       
    });
    
});