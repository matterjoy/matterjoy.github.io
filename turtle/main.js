var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 20
			},
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

function preload() {//preloading all the image files
	this.load.image('ocean', 'images/ocean.jpg');
	this.load.image('turtle', 'images/turtle.PNG');
	this.load.image('plastic1', 'images/straw_1.PNG');
	this.load.image('plastic2', 'images/straw_2.PNG');
	this.load.image('plastic3', 'images/water_bottle.PNG');
	this.load.image('kelp', 'images/kelp.PNG');
}

//establishing the neccesary variables thath will be used in various part of game
var player;
var background;
var keys;
var life1;
var life2;
var life3;
var plastic;
var score;
var points;
var kelp;
var instructions;

function create() {//creating spirtes and images
	
	score = 0;
	
	background = this.add.image(350, 300, 'ocean');
	background.setScale(.2);

	player = this.physics.add.sprite(400, 500, 'turtle');//player
	player.setScale(.05);
	player.setCollideWorldBounds(true);//player can't leave game window
	player.body.setAllowGravity(false);//player not affected by gravity

	var lifeText = this.add.text(600, 10, "Lives: ", {//life counter
		fontFamily: '"Arial Black", sans-serif'
	});
	lifeText.setDepth(200);
	life1 = this.add.image(680, 20, 'turtle');
	life1.setScale(.015);
	life1.setDepth(200);
	life2 = this.add.image(700, 20, 'turtle');
	life2.setScale(.015);
	life2.setDepth(200);
	life3 = this.add.image(720, 20, 'turtle');
	life3.setScale(.015);
	life3.setDepth(200);
	
	keys = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN,Z,X');//adding input listener

	var scoreText = this.add.text(50, 10, "Score: ", {//score tracker
		fontFamily: '"Arial Black", sans-serif'
	});
	scoreText.setDepth(200);
	points = this.add.text(130, 10, score, {
		fontFamily: '"Arial Black", sans-serif'
	});
	points.setDepth(200);

	instructions = this.add.text(265, 250, "Avoid plastics and grab kelp!", {//directions for player
		fontFamily: '"Arial Black", sans-serif'
	});

}

//variables used in the update method
var counter = 0;
var lives = 3;
var inZone = false;
var interval = 50;
var currentPlastic;
var kelpInZone = false;

function update() {//executes 60 times every second
	//if statements that check if each arrow key is down and moves the player if they are
	if (keys.LEFT.isDown) {
		player.x -= 5;

	}
	if (keys.RIGHT.isDown) {
		player.x += 5;

	}
	if (keys.UP.isDown) {
		player.y -= 5;

	}
	if (keys.DOWN.isDown) {
		player.y += 5;
	}
	if (counter > 300) {//directions disappear after 5 seconds
		instructions.destroy();
	}
	if (counter % 600 == 0) {//decreases the time between spawn for plasctics every 10 seconds
		interval -= 2;
	}
	if (counter % interval == 0) {//checks if a plastic should be spawned at this time
		var typePlastic = Math.floor(Math.random() * Math.floor(3) + 1);
		plastic = this.physics.add.sprite(Math.floor(Math.random() * Math.floor(800)), -100, 'plastic' + typePlastic);//creates plastic at random x coordinate of a random type
		plastic.setScale(.05);
		plastic.setBodySize(200, 300, true);
	}
	if (counter % 1200 == 0) {//spawns a kelp in a random x coordinate every 20 seconds
		kelp = this.physics.add.sprite(Math.floor(Math.random() * Math.floor(800)), -100, 'kelp');
		kelp.setScale(.05);
	}
	this.physics.add.overlap(player, plastic, function () {//checks if player's body is touching plastic's body
		inZone = true;
	});
	this.physics.add.overlap(player, kelp, function () {//checks if player's body is touching kelp's body
		kelpInZone = true;
		kelp.destroy();
	});
	counter++;//used to keep track of time in game
	//chain of if/else statements that check if player is touching a plastic and gets rid of the appropriate life if true
	if (inZone && lives == 3 && counter % 100 == 0) {
		inZone = false;
		life3.destroy();
		plastic.destroy();
		lives--;
	} else if (inZone && lives == 2 && counter % 100 == 0) {
		inZone = false;
		life2.destroy();
		plastic.destroy();
		lives--;
	} else if (inZone && lives == 1 && counter % 100 == 0) {
		inZone = false;
		life1.destroy();
		plastic.destroy();
		lives--;
	}
	//chain of if/else statements that check if player is touching a kelp and adds a life and 1000 points if true
	if (kelpInZone && lives == 3) {
		kelpInZone = false;
		score += 1000;
		points.setText(score);
	} else if (kelpInZone && lives == 2) {
		kelpInZone = false;
		score += 1000;
		life3 = this.add.image(720, 20, 'turtle');
		life3.setScale(.015);
		life3.setDepth(200);
		points.setText(score);
		lives++;
	} else if (kelpInZone && lives == 1) {
		kelpInZone = false;
		score += 1000;
		life2 = this.add.image(700, 20, 'turtle');
		life2.setScale(.015);
		life2.setDepth(200);
		points.setText(score);
		lives++;
	}
	if (lives > 0 && counter % 60 == 0) {//adds 50 points every second
		score += 50;
		points.setText(score);
	}
	if (lives == 0 && counter % 100 == 0) {//checks if the player is out of lives and displays end game message if true
		this.add.text(215, 250, 'Uh oh! You consumed too many plastics!', {
			fontFamily: '"Arial Black", sans-serif'
		});
		this.add.text(215, 270, 'Your Score was: ' + score + '. Click restart to try again!', {
			fontFamily: '"Arial Black", sans-serif'
		});
		this.scene.pause();//pauses game scene
	}
}