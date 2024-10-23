var s; // snake object 
var scl = 20; // box within the grid 
var food;
var frameRateAmount = 10;
var gameState = 1;

function setup() {
  createCanvas(300, 300);
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

  if (gameState == 1){
    gameState = 0;
    frameRate(0);
  } else {
    gameState = 1;
    frameRate(10);
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

// This is like the loop function in arduino that just constantly loops
function draw() {
  background(51);
  s.death(); // check if the snake has bit itself before updating its position
  s.update();
  s.show();
  frameRate(frameRateAmount);
  
  // you want the snake to eat the food 
  if(s.eat(food)){
    pickLocation();
  } 
  
  // TODO: change design of food (maybe spinning dragon ball)
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl); // position and size 

  // Update the player's score w/r/t to the snake's tail length
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  
  // (0,0) is top left corner and everything from there is positive 
  text("Score: " + s.tail.length * 5, 100, 280); 
}