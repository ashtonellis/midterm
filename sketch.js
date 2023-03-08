const host = '10.132.136.127:8080';
var socket;

var xyzData = [0,0,0]; 

rock = 0;
move = false;

threshH = -0.5;
threshL = -0.3;
pastVal = -0.4;

let des = [];
let fun = [];


function preload() {
  flames = loadImage('img/flames1.jpg');
  flamesAnimate = loadGif('img/flames.gif');
  des[0] = loadImage('img/des1.jpg');
  des[1] = loadImage('img/des2.png');
  des[2] = loadImage('img/des3.jpg');
  des[3] = loadImage('img/des4.jpg');
  des[4] = loadImage('img/des5.jpg');
  des[5] = loadImage('img/des6.jpg');
  fun[0] = loadImage('img/fun1.jpg');
  fun[1] = loadImage('img/fun2.jpg');
  fun[2] = loadImage('img/fun3.jpg');
  fun[3] = loadImage('img/fun4.jpg');
  fun[4] = loadImage('img/fun5.jpg');
  fun[5] = loadImage('img/fun6.jpg');
  sleep = loadImage("img/sleep.png");
  play = loadImage("img/play.png");
  burn = loadImage("img/burn.png");
  repeat = loadImage("img/repeat.png");
}

function setup() {
  createCanvas(1600,900);
  angleMode(DEGREES);
  imageMode(CENTER);
  deg = 0;
  
  // connect to server...
  socket = new WebSocket('ws://' + host);
  socket.onopen = openHandler;
  socket.onmessage = messageHandler;
}

function draw() {
  background(0);
  image(flames, 432.5, 375);

  curVal = xyzData[1]
  if (curVal <= threshH && pastVal >= threshH) {
    rock++;
  }
  if (curVal >= threshL && pastVal <= threshL) {
    rock++;
  }
  pastVal = curVal


  if (rock >= 2 && rock < 4) {
    shuffle(des, true);
    shuffle(fun, true);
  }

  if (rock > 3) {
    image(flamesAnimate, 432.5, 375);
  }

  if (rock > 4) {
    push()
    translate(420,380);
    rotate(-5);
    tint(255,190);
    image(des[0],0,0);
    pop();
  }

  if (rock > 5) {
    push()
    translate(745,120);
    rotate(30);
    tint(255,190);
    image(fun[0], 0, 0);
    pop()
  }

  if (rock > 6) {
    push()
    translate(290,620);
    rotate(15);
    tint(255,190);
    image(des[1],0,0);
    pop();
  }

  if (rock > 7) {
    push()
    translate(700,615);
    rotate(-20);
    tint(255,190);
    image(fun[1],0,0);
    pop();
  }

  if (rock > 8) {
    push()
    translate(175,200);
    rotate(-20);
    tint(255,190);
    image(des[2],0,0);
    pop()
  }

  if (rock > 9) {
    push()
    translate(125,500);
    rotate(-35);
    tint(255,190);
    image(fun[2],0,0);
    pop();
  }

  if (rock > 10) {
    push()
    translate(625,430);
    rotate(25);
    tint(255,190);
    image(des[3],0,0);
    pop();
  }

  if (rock > 12) {
    push()
    translate(500,550);
    rotate(20);
    tint(255,190);
    image(fun[3],0,0);
    pop();
  }

  if (rock > 13) {
    push()
    translate(420,100);
    rotate(15);
    tint(255,190);
    image(des[4],0,0);
    pop();
  }

  if (rock > 14) {
    push()
    translate(690,290);
    rotate(-15);
    tint(255,190);
    image(fun[4],0,0);
    pop();
  }

  if (rock > 15) {
    push()
    translate(70,60);
    rotate(-25);
    tint(255,190);
    image(des[5],0,0);
    pop();
  }

  if (rock > 16) {
    push()
    translate(190,350);
    rotate(25);
    tint(255,190);
    image(fun[5],0,0);
    pop();
  }

  if (rock > 17 && rock < 25) {
    push()
    translate(432.5,0);
    image(sleep,0,150);
    pop()
  }

  if (rock > 18 && rock < 27) {
    push()
    translate(432.5,0);
    image(play,0,300);
    pop()
  }

  if (rock > 19 && rock < 29) {
    push()
    translate(432.5,0);
    image(burn,0,450);
    pop()
  }

  if (rock > 20 && rock < 31) {
    push()
    translate(432.5,0);
    image(repeat,0,600);
    pop()
  }

  if (rock > 32) {
    rock = 0;
  }
}

function openHandler() {
  println("Connected to server at " + host);
}
  
function messageHandler(event) {
  var msg = event.data; // read data from the onmessage event
  xyzData = split(msg,' ').map(Number); // split the data into an array *of numbers*
}