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
        // TODO: maybe some sound effect once they eat the food or dragonball
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
      
      // lock the rectangle to be within the dimensions of the canvas 
      // this.x = constrain(this.x, 0, width-scl);
      // this.y = constrain(this.y, 0, height-scl);

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
    
    // create the actual snake object as a rectangle
    this.show = function(){
      fill(255);
      
      for (var i = 0; i < this.tail.length; i++){
          rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
      
      // TODO: change the design of the snake to be like a dragon 
      // Or maybe flying nimbus 
      fill(255);
      rect(this.x, this.y, scl, scl);
    }
    
    
  }