function setup() {
  var canvas =createCanvas(windowWidth, windowHeight);
  // createCanvas(clientHeight, clientWidth);
  canvas.position(0,0);
  canvas.style("z-index", "-1" );
  //background(0);

}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 100, 100);
}