let christmasDay = new Date(2022, 11, 25)
const countToDate = christmasDay
//const countToDate = new Date().setHours(new Date().getHours() + christmasDay)
let previousTimeBetweenDates
setInterval(() => {
  const currentDate = new Date()
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
  flipAllCards(timeBetweenDates)

  previousTimeBetweenDates = timeBetweenDates
}, 250)

function flipAllCards(time) {
  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600) % 24
  const days = Math.floor(time/(3600*24) )
  
  flip(document.querySelector("[data-days-hundreds]"), Math.floor(days / 100) )
  flip(document.querySelector("[data-days-tens]"), Math.floor(days/10 % 10))
  flip(document.querySelector("[data-days-ones]"), days % 10)
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
  flip(document.querySelector("[data-hours-ones]"), hours % 10)
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top")
  const startNumber = parseInt(topHalf.textContent)
  if (newNumber === startNumber) return

  const bottomHalf = flipCard.querySelector(".bottom")
  const topFlip = document.createElement("div")
  topFlip.classList.add("top-flip")
  const bottomFlip = document.createElement("div")
  bottomFlip.classList.add("bottom-flip")

  topHalf.textContent = startNumber
  bottomHalf.textContent = startNumber
  topFlip.textContent = startNumber
  bottomFlip.textContent = newNumber

  topFlip.addEventListener("animationstart", e => {
    topHalf.textContent = newNumber
  })
  topFlip.addEventListener("animationend", e => {
    topFlip.remove()
  })
  bottomFlip.addEventListener("animationend", e => {
    bottomHalf.textContent = newNumber
    bottomFlip.remove()
  })
  flipCard.append(topFlip, bottomFlip)
}

//--------------------------------------

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
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
  
  textSize(32);
  
  let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let monthName=months[month()-1];
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
