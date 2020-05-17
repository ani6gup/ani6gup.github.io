var GRAVITY = 0.2;
var image;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index",  "-1" );

  img = loadImage('assets/elephant.png');

}


function draw() {

}

//every mouse press
function mousePressed() {

  image(img, 0, 0);
}