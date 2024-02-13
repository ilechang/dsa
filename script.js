var data = [];
let snowflakes = [];

function preload(){
  data = loadJSON("data.json");
}

function setup() {
    createCanvas(1000, 1000);
}

function draw() {


    background("#dddddd");
    let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(1); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

  fill("rgba(255, 255, 255, 0.8)");
rect(0, 0, 1000, 1000);

textSize(20);
textAlign(RIGHT, BOTTOM);
fill("black");
text("Major exports of Canada", 1000 - 20, 1000 - 20);

$.each(data, insert);
}

function insert(index, item) {
  textSize(20);
  textAlign(LEFT, TOP);
  fill("black");
  text(item.icon + item.name, 20, index*50+20);
  textSize(20);
  textAlign(RIGHT, TOP);
  text("$"+item.amount.toFixed(2)+"B", 1000 - 20, index * 50 + 20);
  fill("red");
  noStroke();
rect(20, index * 50 + 50, item.amount*5.319, 5);
}
// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    // ellipse(this.posX, this.posY, this.size);
    text("🍁",this.posX, this.posY, this.size)
  };
}