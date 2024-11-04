var s; // snake object 
var scl = 20; // box within the grid 
var food; 
var frameRateAmount = 10;
var gameState = 1;
var gameOver = false;
var gameStart = 0;
var maxScore = 0;
var finalScore = 0;
var scoreCalc = 0;

let dragonballImage;

function preload() {
  
  // save the dragonball image in an accesible format 
  dragonballImage = loadImage('assets/dragonball.png');
}

function setup() {
  preload();
  createCanvas(500, 500);
  s = new Snake();
  
  frameRate(frameRateAmount); 
  gameState = 1;
  
  pickLocation();
}

// global event handler
function keyPressed() {
  
  // checking if the user is using the keyboard to play the game 
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW){
    s.dir(0, 1);
  }else if (keyCode === RIGHT_ARROW){
    s.dir(1, 0);
  }else if (keyCode === LEFT_ARROW){
    s.dir(-1, 0);
  }else if (keyCode === 32){
    console.log("Space hit, changing game state");
    changeGameState();
  }
  
}

// This function handles the setup tasks needed for when a player dies 
// and the game needs to be restarted. 
function restartGame() {

  // Once we've started the game at the beginning, just continue normal
  // protocol
  if (!gameStart){
    gameStart = 1;
  }

  console.log("Restarting game");
  s = new Snake();
  pickLocation();
  gameOver = false;
  gameState = 1;
  frameRate(frameRateAmount);
}

// Update the frame rate which is directly proportional to the speed of the 
// snake as a function of the passed in parameter 
function changeDifficulty(amount){
  amount = parseInt(amount); // extract the integer
  amount = 10 + 100*(amount/4095); // normalize to pot max value 

  console.log("changing difficulty by: ", amount);
  frameRateAmount = amount; // change this frame rate 

  // If the game is currently running, change the frame rate 
  if (gameState == 1){
    frameRate(frameRateAmount);
  }
}

// This function checks the gameState variable to decide whether or not 
// to pause or continue the game. If the game is over, then reference
// the restartGame function for next steps. 
function changeGameState(){
  if (gameOver || !gameStart) {
    restartGame(); // Reset the game if the snake has died
  } else {
    // Toggle pause/play
    if (gameState == 1) {
      gameState = 0;
      frameRate(0); // Pause the game

      textSize(30);
      fill(255, 0, 1);
      textAlign(CENTER, CENTER);
      text("Game Paused", width / 2, height / 2);
    } else {
      gameState = 1;
      frameRate(frameRateAmount); // Continue the game
    }
  }
  console.log("changing game state to: ", gameState);
}

// only want food to be a specific position within the board 
function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows))); 

  // TODO: prevent food from being generated on the snake's head or tail

  food.mult(scl); // expand the vector's size 
}

// here we are assigning the position & size to the dragonball
// which represents the food of the snake 
function drawFood(){
  image(dragonballImage, food.x, food.y, scl, scl);
}

// This is an infinitely running loop 
function draw() {
  background(0);

  if (gameOver) {
    displayGameOverMenu();
    return;
  } 

  if (!gameStart){
    displayGameStartMenu();
    return;
  }

  if (gameState == 1) {
    s.death(); // check if the snake has bit itself before updating its position
    s.update();
    s.show();
    frameRate(frameRateAmount);
    
    // you want the snake to eat the food 
    if(s.eat(food)){
      pickLocation();
    } 

    // draw the drgonball image as food
    drawFood();
    
    scoreCalc = s.tail.length * 5;
    document.getElementById('score').innerHTML = "Score: " + scoreCalc;


    if (scoreCalc > maxScore) {
      maxScore = scoreCalc;
      document.getElementById('highestScore').innerHTML = "Max Score: " + maxScore;
    }
  }
}

// display the game over menu 
function displayGameOverMenu() {
  textSize(30);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  text("Score: " + finalScore, width / 2, height / 2);
  text("Press the button or space bar to restart", width / 2, height / 2 + 20);
}

// display the game start menu 
function displayGameStartMenu() {
  textSize(30);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("Start Game!", width / 2, height / 2 - 50);
  textSize(20);
  text("Press the button or space bar to start", width / 2, height / 2);
}