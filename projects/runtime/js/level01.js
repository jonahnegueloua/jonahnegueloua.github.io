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
                { "type": "sawblade", "x": 600, "y": groundY - 100},
                { "type": "sawblade", "x": 1100, "y": groundY - 50},
                { "type": "sawblade", "x": 1500, "y": groundY - 105},
                
                { "type": "enemy", "x": 1200, "y": groundY - 50},
                { "type": "enemy", "x": 1400, "y": groundY - 50},
                { "type": "enemy", "x": 2000, "y": groundY - 50},
                { "type": "enemy", "x": 2300, "y": groundY - 50},
                { "type": "enemy", "x": 2700, "y": groundY - 50},
                { "type": "enemy", "x": 3000, "y": groundY - 50},
            
                { "type": "reward", "x": 900, "y": groundY - 100},
                { "type": "reward", "x": 1700, "y": groundY - 100},
                { "type": "reward", "x": 2500, "y": groundY - 100},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 15; //creates the size of the hitzone
            var damageFromObstacle = 500; //sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //created the hitzone and stores it in the variable
            sawBladeHitZone.x = x; // the x position of the hitzone
            sawBladeHitZone.y = y; // the y position of the hitzone
            game.addGameItem(sawBladeHitZone); // add the hitzone to the game
            
            var obstacleImage = draw.bitmap('img/putin.png'); // 
            sawBladeHitZone.addChild(obstacleImage); // add the image to the hitzone so we can see 
            obstacleImage.x = -25; // tweaks the image 150 pixels to the left
            obstacleImage.y = -25; // tweaks the image 150 pixels up
           
            obstacleImage.scaleX = 1;
            obstacleImage.scaleY = 1;        
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
         var rewardImg = draw.bitmap('img/edp445.png'); // creates rectangle and stores as redSquare
         reward.x = -25; 
         reward.y = -25;
         reward.addChild(rewardImg);

         reward.x = x;
         reward.y = y;
          
         game.addGameItem(reward); // adds reward to the game

          reward.velocityX = -1; // this causes the reward to move one pixel to the left on the x position

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
