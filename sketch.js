var ball;
var bricks = [];
var numBricks = 15;
var paddle;

function setup() {
  createCanvas(400, 400);

  // Make ball
  ball = new Ball();


  // Make bricks
  for (var i = 0; i < numBricks; i++) {
    for (var j = 0; j < 10; j++) {
      bricks.push(new Brick(40 * j, 30 + 10 * i))
    }
  }

  // Make paddle
  paddle = new Paddle();
}

function draw() {
  background(220);

  // Deal with ball
  ball.move();
  ball.checkCollisions();
  ball.display();

  // Deal with bricks
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].display();
  }

  // Deal with paddle
  paddle.x = mouseX;
  paddle.display();
}

function Ball() {
  this.x = 200;
  this.y = 250;
  this.speedX = 1.5;
  this.speedY = 1.5;
  this.diameter = 20;
  this.color = "purple";

  this.getTop = function() {
    return this.y - this.diameter / 2;
  }

  this.getBottom = function() {
    return this.y + this.diameter / 2;
  }

  this.getLeft = function() {
    return this.x - this.diameter / 2;
  }

  this.getRight = function() {
    return this.x + this.diameter / 2;
  }

  this.display = function() {
    fill(this.color);
    ellipse(this.x, this.y, this.diameter);
  }

  this.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Check bottom wall
    if (this.getBottom() >= height) {
      this.speedY *= 0;
      this.speedX *= 0;
    }

    // Check top wall
    if (this.getTop() <= 0) {
      this.speedY *= -1;
    }

    // Check left wall
    if (this.getLeft() >= 0) {
      this.speedX *= -1;
    }

    // Check left wall
    if (this.getRight() <= width) {
      this.speedX *= -1;
    }
  }

  // Top of ball hits bottom of brick
  this.checkTopCollision = function(brick) {
    return this.getTop() >= brick.getTop() && this.getTop() <= brick.getBottom();
  }
  
  // Bottom of ball hits top of brick
  this.checkBottomCollision = function(brick) {
    return this.getBottom() >= brick.getBottom() && this.getBottom() <= brick.getTop();
  }

  // Left side of ball hits right side of brick
  this.checkLeftCollision = function(brick) {
    return this.getLeft() >= brick.getLeft() && this.getLeft() <= brick.getRight()
  }

  // Right side of ball hits right side of brick
  this.checkRightCollision = function(brick) {
    return this.getRight() >= brick.getRight() && this.getRight() <= brick.getLeft()
  }

  this.checkCollisions = function() {
    if (this.getLeft() >= paddle.getLeft() &&
      this.getLeft() <= paddle.getRight() &&
      this.getBottom() >= paddle.getTop() &&
      this.getBottom() <= paddle.getBottom()) {
      this.speedY *= -1;
    }

    for (var i = 0; i < bricks.length; i++) {
      if (bricks[i].broken == false &&
         (this.checkTopCollision(bricks[i]) || this.checkTopCollision(bricks[i])) &&
         (this.checkLeftCollision(bricks[i]) || this.checkRightCollision(bricks[i]))) {
        this.speedY *= -1;
        bricks[i].broken = true;
      }
    }
  }

}

function Brick(startingX, startingY) {
  this.x = startingX;
  this.y = startingY;
  this.width = 40;
  this.height = 10;
  this.color = "yellow";
  this.broken = false;

  this.getTop = function() {
    return this.y;
  }

  this.getBottom = function() {
    return this.y + this.height;
  }

  this.getLeft = function() {
    return this.x;
  }

  this.getRight = function() {
    return this.x + this.width;
  }

  this.display = function() {
    if (this.broken == false) {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }
  }
}

function Paddle() {
  this.x = 100;
  this.y = 350;
  this.width = 100;
  this.height = 20;
  this.color = "red";

  this.getTop = function() {
    return this.y;
  }

  this.getBottom = function() {
    return this.y + this.height;
  }

  this.getLeft = function() {
    return this.x;
  }

  this.getRight = function() {
    return this.x + this.width;
  }

  this.display = function() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}