var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 300, "y": groundY - 50},
                { "type": "sawblade", "x": 500, "y": groundY - 50},
                { "type": "sawblade", "x": 800, "y": groundY - 50},
                
                { "type": "enemy", "x": 450, "y": groundY - 50},
                { "type": "enemy", "x": 250, "y": groundY - 50},
                { "type": "enemy", "x": 700, "y": groundY - 50},
                { "type": "enemy", "x": 550, "y": groundY - 50},
                { "type": "enemy", "x": 1000, "y": groundY - 50},
                { "type": "enemy", "x": 600, "y": groundY - 50},
            
                { "type": "reward", "x": 950, "y": groundY - 50},
                { "type": "reward", "x": 2000, "y": groundY - 50},
                { "type": "reward", "x": 1800, "y": groundY - 50},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 15; //creates the size of the hitzone
            var damageFromObstacle = 100; //sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //created the hitzone and stores it in the variable
            sawBladeHitZone.x = 10; // the x position of the hitzone
            sawBladeHitZone.y = 10; // the y position of the hitzone
            game.addGameItem(sawBladeHitZone); // add the hitzone to the game
            
            var obstacleImage = draw.bitmap('img/putin.png'); // 
            sawBladeHitZone.addChild(obstacleImage); // add the image to the hitzone so we can see 
            obstacleImage.x = -50; // tweaks the image 25 pixels to the left
            obstacleImage.y = -50; // tweaks the image 25 pixels up
            sawBladeHitZone.rotationalVelocity = 6;
        }

        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25); // creating the game item and storing it in the varibale reward
            var redSquare = draw.bitmap('img/ben.png');
            redSquare.x = -25; 
            redSquare.y = -25;
            enemy.addChild(redSquare);
            
   
            enemy.x = x;
            enemy.y = y;
             
            game.addGameItem(enemy); // adds reward to the game
   
             enemy.velocityX = -1; // this causes the reward to move one pixel to the left on the x position
   

            enemy.scaleX = 2.0;
            enemy.scaleY = 2.0;
   
            enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            game.increaseScore(10);
            };   
            enemy.onProjectileCollision = function() {
            console.log('The projectile has hit reward');
            game.changeIntegrity(-10);
            enemy.fadeOut();
            };
          }
        
      
       function createReward(x, y){
         var reward = game.createGameItem('reward',25); // creating the game item and storing it in the varibale reward
         var blueSquare = draw.rect(50,50,'blue'); // creates rectangle and stores as redSquare
         var blueSquare
         blueSquare.x = -25; 
         blueSquare.y = -25;
         reward.addChild(blueSquare);

         reward.x = x;
         reward.y = y;
          
         game.addGameItem(reward); // adds reward to the game

          reward.velocityX = -1; // this causes the reward to move one pixel to the left on the x position

         reward.rotationalVelocity = 15;

         reward.onPlayerCollision = function() {
         console.log('The reward has hit Halle');
         game.changeIntegrity(100);
         game.increaseScore(10);
         };   
         reward.onProjectileCollision = function() {
         console.log('The projectile has hit reward');
         game.changeIntegrity(100);
         game.increaseScore(10000);
         reward.fadeOut();
         };
       }


        for (var i = 0; i < levelData.gameItems.length; i++){
              var gameItem = levelData.gameItems[i];

              if (gameItem.type === "sawblade"){
                    createSawBlade(gameItem.x, gameItem.y);
              }    
              if (gameItem.type === "enemy"){
                    createEnemy(gameItem.x, gameItem.y);
              }
              if (gameItem.type === "reward"){
                    createReward(gameItem.x, gameItem.y);
              }

        }

      
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
