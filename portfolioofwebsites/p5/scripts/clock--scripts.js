let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

var bg;

function preload(){
    bg = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mandel_zoom_00_mandelbrot_set.jpg/800px-Mandel_zoom_00_mandelbrot_set.jpg?20131013213131")
}

function setup() {
var myCanvas = createCanvas(600, 400);
    myCanvas.parent("p5canvas--clock");
  //createCanvas(720, 400);
  stroke(255);

  let radius = min(width, height) / 2 * 0.25;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width * 0.4;
  cy = height / 2;
}

function draw() {
  background(bg);
  //background(230);

  // Draw the clock background
  noStroke();

  //image(bg, 0, 0);
  //noFill();
  
  //fill(244, 122, 158);
  //ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  //fill(237, 34, 93);
  //ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(1);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
  
  textSize(32);
  
  let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthName=months[month()];
  let theDay = day();
  let theYear = year();
  let dateString = monthName + '\n' + theDay + '\n' + theYear
  fill(218, 165, 32);
  textAlign(CENTER, CENTER);
	text(dateString, cx + (width * 0.25), cy);
  
  let theHour = hour();
  let theMin = "";
  theMin = minute().toString().length < 2 ? "0" + minute().toString() : minute().toString() ;
  let theSec = ""
  theSec = second().toString().length < 2 ? "0" + second().toString() : second().toString() ;
  
  second()
  
  let timeString = `${theHour}:${theMin}:${theSec}`
  fill(218, 165, 32);
  text(timeString, cx - (width * 0.2), cy - height * 0.3);  
}
