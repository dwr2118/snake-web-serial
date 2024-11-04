function Snake(){
    this.x = 0;
    this.y = 0;   
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = []; 
    
    // change the direction of the moving rectangle aka the head of the snake 
    this.dir = function(x, y){
      this.xspeed = x;
      this.yspeed = y;
    }
    
    // deal with the snake eating the food, check if the snake is at the same position as the food
    this.eat = function(pos){
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1){
        this.total++; // increase the # of rectangles 
        return true; 
      } else{
        return false;
      }
    }
    
    this.death = function() {
      for ( var i = 0; i < this.tail.length; i++){
        var pos = this.tail[i];
        var d = dist(this.x, this.y, pos.x, pos.y);
        
        // returns the snake to nothing if the front location is connected to any part of the tail
        if (d < 1){
          console.log('starting over');
          finalScore = scoreCalc;
          gameOver = true;
          gameState = 2;
          this.total = 0;
          this.tail = [];
        }
      }
    }
    
    this.update = function() {
      
      // only shift if we haven't eaten any new food 
      if (this.total === this.tail.length) {

        // shifting everything down and leaving space for the new head position
        for (var i = 0; i < this.tail.length-1; i++){
          this.tail[i] = this.tail[i+1]; 
        }
      }
      
      // define the new head 
      this.tail[this.total-1] = createVector(this.x, this.y);
      
      // current location 
      this.tail[this.total-1] = createVector(this.x, this.y);
           
      this.x = this.x + this.xspeed*scl;
      this.y = this.y + this.yspeed*scl;

      // allow for the teleportation of the snake's head to the opposing side
      // if it reaches the edge of the canvas 
      if (this.x >= width) {
        this.x = 0;  // Wrap to the left if it goes past the right edge
      } else if (this.x < 0) {
        this.x = width - scl;  // Wrap to the right if it goes past the left edge
      }
    
      if (this.y >= height) {
        this.y = 0;  // Wrap to the top if it goes past the bottom edge
      } else if (this.y < 0) {
        this.y = height - scl;  // Wrap to the bottom if it goes past the top edge
      }
      
    }
  

    this.show = function() {
      // Draw Shenron's body (snake)
      fill(0, 255, 0); // Green color for Shenron's body
      
      // Loop over the tail to draw Shenron's segments
      for (var i = 0; i < this.tail.length; i++) {

        // Draw the top half with light green color
        fill(0, 200, 0) // Light green color
        rect(this.tail[i].x, this.tail[i].y, scl, scl / 2); // Top half rectangle

        // Draw the bottom half with yellow color
        fill(255, 204, 0); // Yellow color for the belly
        rect(this.tail[i].x, this.tail[i].y + scl / 2, scl, scl / 2); // Bottom half rectangle

        // Draw lines to mimic the texture of the yellow belly
        stroke(0); // Black color for lines
        strokeWeight(2); // Set line thickness
        for (let j = 0; j < scl / 2; j += 4) { // Adjust spacing as needed
            line(this.tail[i].x, this.tail[i].y + scl / 2 + j, this.tail[i].x + scl, this.tail[i].y + scl / 2 + j);
        }
      }
    
      // Draw Shenron's head (different from the body)
      fill(0, 200, 0); // Slightly darker green for the head
      rect(this.x, this.y, scl, scl); // Shenron's head base
    
      // Optionally, add eyes or horns to Shenron's head
      fill(255, 0, 0); // Red for the eyes 
      ellipse(this.x + scl / 3, this.y + scl / 3, scl / 3, scl / 3); // Left eye
      ellipse(this.x + 2 * scl / 3, this.y + scl / 3, scl / 3, scl / 3); // Right eye
      
    
      // Add horns or fangs
      stroke(222, 184, 135); // White for the horns
      line(this.x, this.y, this.x - scl / 2, this.y - scl / 2); // Left horn
      line(this.x + scl, this.y, this.x + scl + scl / 2, this.y - scl / 2); // Right horn
    }
    
    
    
  }