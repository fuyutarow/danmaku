console.log("ponponball!");

var one = Math.floor(Math.random()*2)*2-1
console.log(one);

var TPI = Math.PI*2;
const WIDTH = 640;
const HEIGHT = 480;
const RADIUS = 2;
const NUM = 30
const bNUM = 100;
var r = new Array(NUM);
var g = new Array(NUM);
var b = new Array(NUM);
var step;
var ctx;


class Jiki {
  constructor() {
    this.qx = Math.random()*WIDTH;
    this.qy = Math.random()*HEIGHT;
    this.vx = 5.0*(Math.floor(Math.random()*2)*2-1);
    this.vy = 5.0*(Math.floor(Math.random()*2)*2-1);
  }
  status(){console.log(
    "this.qx",this.qx,
    "this.qy",this.qy,
    "this.vx",this.vx,
    "this.yx",this.vy
  );}
}

class Snifer {
  constructor(num){
    this.num = num;
    this.qx = new Array(this.num);
    this.qy = new Array(this.num);
    this.vx = new Array(this.num);
    this.vy = new Array(this.num);
    this.radius = new Array(this.num);
    for (var i = 0; i < 100; i++) {
      this.qx[i]; // i;
      this.qy[i];// i%10*10;
      this.vx[i] = 2*Math.cos(i*TPI/this.num);
      this.vy[i] = 2*Math.sin(i*TPI/this.num);
      this.radius[i] = RADIUS;
    }
  }
  //set num(num){ this._num = num;}
  status(){console.log(
    "this.num", this.num,
    "this.qx", this.qx,
    "this.qy", this.qy,
    "this.vx", this.vx,
    "this.vy", this.vy,
    "this.radius", this.radius
  );}
}

class Alice extends Jiki{
  constructor(qx,qy,vx,vy){
    super(qx,qy,vx,vy);
    this.snifer = [];
    this.k = 0;
    this.col;
  }
}

var alice = new Alice();
alice.col = '#FF9933'
var bob = new Alice();
bob.col = '#3399FF'

function init() {
  var canvas = document.getElementById('ponpon100');
  for(var i = 0; i < NUM; i++){
    r[i] = Math.floor(Math.random() * 64);
    g[i] = Math.floor(Math.random() * 64);
    b[i] = Math.floor(Math.random() * 64);
  }
  if (canvas.getContext){
    step = 0;
    ctx = canvas.getContext('2d');
    setInterval(draw,100);
  }
}

function draw(){
  ctx.globalCompositionOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.5)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.gloabalCompositionOperation = "lighter";

  // for alice
  if (step%30==0){
    alice.snifer[alice.k] = new Snifer(NUM);
    for (var i = 0; i < alice.snifer[alice.k].num; i++){
      alice.snifer[alice.k].qx[i] = alice.qx;
      alice.snifer[alice.k].qy[i] = alice.qy;
    }
    alice.k++;
  }
  for (var j = 0; j < alice.k; j++){
    for (var i = 0; i < alice.snifer[j].num; i++) {
      alice.snifer[j].qx[i] += alice.snifer[j].vx[i];
      alice.snifer[j].qy[i] += alice.snifer[j].vy[i];

      ctx.beginPath();
      ctx.fillStyle = alice.col;
      ctx.arc(alice.snifer[j].qx[i], alice.snifer[j].qy[i], alice.snifer[j].radius[i], 0, TPI, true);
      ctx.fill();
    }
  }
  alice.qx += alice.vx;
  alice.qy += alice.vy;
  if (alice.qx < 0 || alice.qx > WIDTH) alice.vx *= -1;
  if (alice.qy < 0 || alice.qy > HEIGHT) alice.vy *= -1;
  ctx.fillStyle = alice.col;
  ctx.fillRect(alice.qx,alice.qy,10,10);

  // for bob
  if (step%50==10){
    bob.snifer[bob.k] = new Snifer(NUM);
    for (var i = 0; i < bob.snifer[bob.k].num; i++){
      bob.snifer[bob.k].qx[i] = bob.qx;
      bob.snifer[bob.k].qy[i] = bob.qy;
    }
    bob.k++;
  }
  for (var j = 0; j < bob.k; j++){
    for (var i = 0; i < bob.snifer[j].num; i++) {
      bob.snifer[j].qx[i] += bob.snifer[j].vx[i];
      bob.snifer[j].qy[i] += bob.snifer[j].vy[i];

      ctx.beginPath();
      ctx.fillStyle = bob.col;
      ctx.arc(bob.snifer[j].qx[i], bob.snifer[j].qy[i], bob.snifer[j].radius[i], 0, TPI, true);
      ctx.fill();
    }
  }
  bob.qx += bob.vx;
  bob.qy += bob.vy;
  if (bob.qx < 0 || bob.qx > WIDTH) bob.vx *= -1;
  if (bob.qy < 0 || bob.qy > HEIGHT) bob.vy *= -1;
  ctx.fillStyle = bob.col;
  ctx.fillRect(bob.qx,bob.qy,10,10);


  step += 1;
  try{console.log(step);}catch(e){}
}
