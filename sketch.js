let t = 0; // time variable
var GRAVITY = 0.2;
var img;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index",  "-1" );

  noStroke();
  fill(109, 79, 216);

}

function draw() {

  background(255, 255,255); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 100) {
    for (let y = 0; y <= height; y = y + 100) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 100 * cos(2 * PI * t + angle);
      const myY = y + 100 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 10); // draw particle
    }
  }



  //the best way to organize sprites is to use a custom group (see Group class)
  //however, all sprites are automatically added to a default group allSprites
  //that you can access like a normal array of objects

  for(var i=0; i<allSprites.length; i++)
  {
      var mySprite = allSprites[i];

    //adding a speed at 90 degrees (down)
    //equivalent to: mySprite.velocity.y += GRAVITY;
    mySprite.addSpeed(GRAVITY, 90);

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
  t = t + 1; // update time
  //I create a sprite at mouse position
  var newSprite = createSprite(mouseX, mouseY);

  //assign an animation
  newSprite.addAnimation('normal','assets/elephant-small.png');

  //and set it to a random frame
  newSprite.animation.stop();
  var f = round(random(0, newSprite.animation.getLastFrame()));
  newSprite.animation.changeFrame(f);
}
