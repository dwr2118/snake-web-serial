var s; // snake object 
var scl = 20; // box within the grid 
var food;

function setup() {
  createCanvas(300, 300);
  s = new Snake();
  
  // lowering framerate to be part of the aesthetic
  frameRate(10);
  
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
  
  // you want the snake to eat the food 
  if(s.eat(food)){
    pickLocation();
  } 
  
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl); // position and size 
}