let numBalls = 30;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
let balls = [];

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index",  "-1" );

  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  noStroke();
  fill(114, 214,191);
}

function draw() {
  background(255);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });

  for(var i=0; i<allSprites.length; i++)
  {
      var mySprite = allSprites[i];

    //adding a speed at 90 degrees (down)
    //equivalent to: mySprite.velocity.y += GRAVITY;
    mySprite.addSpeed(gravity, 90);

    //even if they are out of the canvas, sprites keep getting updated
    //consuming precious memory
    //use Sprite.remove() to remove a sprite from the sketch
    if(mySprite.position.y > height + 100)
      mySprite.remove();
  }

  if(frameCount%10 == 0)
    print('Sprite in the scene: ' +allSprites.length);

  //draw the sprites
  drawSprites();
}


//every mouse press
function mousePressed() {
  //I create a sprite at mouse position
  var newSprite = createSprite(mouseX, mouseY);

  //assign an animation
  newSprite.addAnimation('normal','assets/elephant-small.png','assets/duck.png','assets/chick.png','assets/baymax.png','assets/hamster.png');

  //and set it to a random frame
  newSprite.animation.stop();
  var f = round(random(0, newSprite.animation.getLastFrame()));
  newSprite.animation.changeFrame(f);

}

function keyPressed() {

  balls.forEach(ball => {
    if (keyCode === UP_ARROW) {
      ball.y = ball.y * -100;
    } else if (keyCode === DOWN_ARROW) {
     ball.y = ball.y * 100;
    }
    if (keyCode === LEFT_ARROW) {
      ball.x = ball.x * -50;
    } else if (keyCode === RIGHT_ARROW) {
      ball.x = ball.x * 50;
    }
   });
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  
// attractionPoint (magnitude, pointX, pointY) {
//     var angle = atan2(pointY-this.y, pointX-this.x);
//     this.x += cos(angle) * magnitude;
//     this.y += sin(angle) * magnitude;
//   };

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
