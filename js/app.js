
var Enemy = function() {
	/**
	* Added the different atributes for Enemy.
	**/
    this.movement = [-100, 500],
	this.row = [60, 140, 220],
	this.enemySpeed = [200, 500],
	this.sprite = 'images/enemy-bug.png',
	this.reset();
	
};

Enemy.prototype.reset = function() {
	/*
	* Setting up what the Enemy's x position is, based on a fixed startpoint.
	* Same with Row, one of the three rows.
	* Speed is sey by a function.
	*/
	this.x = this.movement[0];
    this.y = this.randomRow();
    this.speed = this.randomSpeed();
};

Enemy.prototype.update = function(dt) {
	/*
	* Updating the position for the Enemy
	*/
	    this.x += this.speed * dt;
    if (this.x > this.movement[1]) {
        this.reset();
    };
};
/*
* Drawing the Enemy
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* Function for setting wich of the rows the enemy is suppose to be spawned on
*/
Enemy.prototype.randomRow = function() {
    return this.row[Math.floor(Math.random() * this.row.length)];
};

/*
* Function for setting the speed.
*/
Enemy.prototype.randomSpeed = function() {
	
	/*
	* Saving the different speeds so they don't effect the global speed.
	* Adding a EVENTOUTSPEED if that should be changed based on actions the users does
	*/
    var min = this.enemySpeed[0],
        max = this.enemySpeed[1],
		evenOutSpeed = 100;
    return Math.floor(Math.random() * (max - min)) + evenOutSpeed;
	
};

//creting the Player object
var Player = function() {
	/*
	* Creating the Player moment, first is X and second is Y.
	* Adding a reset function to place the Palyer at the start position. 
	*/
	this.movement = [[-2, 402],[-20, 380]];
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
	/*
	* Checking where the Player is based on the map and Enemy's
	*/
    this.positionChecker();
};

Player.prototype.positionChecker = function() {
	/*
	* First is to simply check if the users is at the water.
	*/
    if (player.y === -20) {
        player.reset();
		
		/*
		* Checking if an Enemy is at the Player's position, if it is then use the rest()
		*/
    } else if (this.y >= 60 && this.y <= 220) {
        allEnemies.forEach(function(enemy) {
			//If Enemy and Player is at the same Y position
            if (enemy.y === player.y) {
				//the 40 + 40 is to 
                if (enemy.x >= player.x - 40 && enemy.x <= player.x + 40) {
                    player.reset();
                }
            }
        });
    }
};

Player.prototype.reset = function() {
	/*
	* Simply setting the users postions to the start location.
	*/
    this.x = 200;
    this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(input) {
	/*
	* Using varibale instaed of fixed values
	*/
	var yPos = 80, xPos = 101;
	
	/*
	* Switch for the different inputes, and if to be sure that the player can move. Move based on the varibales.
	*/
	switch(input) {
	case "left":
		if (this.x - xPos >= this.movement[0][0]){ 
			this.x -= xPos;
		};
	  break;
	case "right":
		if (this.x + xPos <= this.movement[0][1]) {
			this.x += xPos;
		};
	  break; 
  	case "up":
		if (this.y - yPos <= this.movement[1][1]) {
			this.y -= yPos;
		};
		
	   break;
  	case "down":
		if (this.y + yPos <= this.movement[1][1]) {
			this.y += yPos;
		};
	};
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
* Adding all the characters for the map.
*/
var allEnemies = [new Enemy(), new Enemy(), new Enemy()],
player = new Player();