var s; // snake object 
var scl = 20; // box within the grid 
var food; 
var frameRateAmount = 10;
var gameState = 1;
var gameOver = false;
var maxScore = 0;
var finalScore = 0;
var scoreCalc = 0;

let dragonballImage;

function preload() {
  dragonballImage = loadImage('assets/dragonball.png');
}

function setup() {
  preload();
  createCanvas(500, 500);
  s = new Snake();
  
  // TODO: dynamically change frame rate after setup given 
  // changes to the frameRateAmount variable 
  // lowering framerate to be part of the aesthetic
  frameRate(frameRateAmount); 
  gameState = 1;
  
  pickLocation();
}

// global event handler
function keyPressed() {
  
  // check built-in p5 variables
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW){
    s.dir(0, 1);
  }else if (keyCode === RIGHT_ARROW){
    s.dir(1, 0);
  }else if (keyCode === LEFT_ARROW){
    s.dir(-1, 0);
  }
  
}

function restartGame() {
  console.log("Restarting game");
  s = new Snake();
  pickLocation();
  gameOver = false;
  gameState = 1;
  frameRate(frameRateAmount);
}

function changeDifficulty(amount){
  amount = parseInt(amount); // extract the integer
  amount = 10 + 100*(amount/4095); // normalize to pot max value 

  console.log("changing difficulty by: ", amount);
  frameRateAmount = amount;

  if (gameState == 1){
    frameRate(frameRateAmount);
  }
}

function changeGameState(){
  if (gameOver) {
    restartGame(); // Reset the game if the snake has died
  } else {
    // Toggle pause/play
    if (gameState == 1) {
      gameState = 0;
      frameRate(0); // Pause the game

      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(30);
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
  food.mult(scl); // expand the vector's size 
}

function drawFood(){
  image(dragonballImage, food.x, food.y, scl, scl);
}

// This is like the loop function in arduino that just constantly loops
function draw() {
  background(0);

  if (gameOver) {
    displayMenu();
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
    
    // // TODO: change design of food (maybe spinning dragon ball)
    // fill(255, 0, 100);
    // rect(food.x, food.y, scl, scl); // position and size 
    
    // update the score 
    // let scoreCalc = s.tail.length * floor(frameRateAmount/2);
    scoreCalc = s.tail.length * 5;
    document.getElementById('score').innerHTML = "Score: " + scoreCalc;


    if (scoreCalc > maxScore) {
      maxScore = scoreCalc;
      document.getElementById('highestScore').innerHTML = "Max Score: " + maxScore;
    }
  }
}

// display the game over menu 
function displayMenu() {
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  text("Score: " + finalScore, width / 2, height / 2);
  text("Press the button to restart", width / 2, height / 2 + 20);
}