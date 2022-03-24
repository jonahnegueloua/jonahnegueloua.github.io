var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'green');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            
            for(var i = 0; i <= 100; i++){ // a for loop is created that stored 1       500 circles
                var circle = draw.circle(5,'white','LightGray',2); // the variable circle is declared and it stores code to draw the circle
                circle.x = canvasWidth*Math.random(); // multpilies canvasWidth * a random decimal between .1 and .99 and assigns it to circle.x
                circle.y = groundY*Math.random(); //  multpilies groundY * a random decimal between .1 and .99 and assigns it to circle.y
                background.addChild(circle); // circle is drawn on the canvas
            }
           
            var moon = draw.bitmap('img/moon.png'); // created a variable moon. draw.bitmap draws the image and stores it in
            moon.x = canvasWidth - 300; // this placed the moon on the ride side
            moon.y = groundY - 450; // this placed the moon at the top
            moon.scaleX = 0.5; // width of the moon 
            moon.scaleY = 0.5; // height of the moon
            background.addChild(moon); // adds the moon to the canvas so it is visible


            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i = 0; i < 5; i++) { // a for loop is used to draw 5 buildings
                var buildingHeight = 300; // the variable buildingHeight is declared and is assigned to the height of the building in pixels
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // the variable buidling in declared and it is assigned to the code for the buildings such as the height and color
                building.x = 200*i; // the x position of the building is 200 multiplied by i
                building.y = groundY-buildingHeight; // the y position of the building is groundY subtracted by the height
                background.addChild(building); // the code for the building is added to the background
                buildings.push(building); // push each individual building to the buildings array
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png'); // variable created the tree
            tree.x = 200; // width of the tree
            tree.y = 337; // height of the tree
            tree.scaleX = 0.5; // heigth of the tree
            tree.scaleY = 0.5; // width of the tree
            background.addChild(tree); // creates the background 

            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!

            tree.x = tree.x - 1; // taking the value of tree.x (x position) and decreasing by 1 pixel every time the update function run. Makes it move left.
            if(tree.x < -200) { // if the x position of the tree exeeds -200, then the x position of the tree will be reset to canvasWidth 
                tree.x = canvasWidth; // the x position of the tree is assigned to the canvasWidth
            }
            
            // TODO 5: Part 2 - Parallax

            // loops the buildings and moves them to the left by 0.5 pixels
            for (var i = 0;i < buildings.length; i++){ // moves the building's position by 0.5 pixels
            buildings[i].x = buildings[i].x - 0.5; // checks to see if the building's x pos is off the left side and if it is it resets 
                if(buildings[i].x < 0) { // 
                    buildings[i].x = canvasWidth;
                }            
            }

        } // end of update function - DO NOT DELETE
        
        
        
  /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

 