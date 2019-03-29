console.log("ponponball!");

var one = Math.floor(Math.random()*2)*2-1
console.log(one);

var TPI = Math.PI*2;
const WIDTH = 640;
const HEIGHT = 480;
const RADIUS = 2;
const HITL = 10;
const aNUM = 10
const bNUM = 30;
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
    this.damage = new Array(this.num);
    for (var i = 0; i < 100; i++) {
      this.qx[i]; // i;
      this.qy[i];// i%10*10;
      this.vx[i] = 2*Math.cos(i*TPI/this.num);
      this.vy[i] = 2*Math.sin(i*TPI/this.num);
      this.radius[i] = RADIUS;
      this.damage[i] = 5;
    }
  }

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
    this.hp = 100;
    this.col;
  }
}

var alice = new Alice();
alice.col = '#3399FF'
var bob = new Alice();
bob.col = '#FF9933'

function init() {
  var canvas = document.getElementById('ponpon100');
  if (canvas.getContext){
    step = 0;
    ctx = canvas.getContext('2d');
    startTimer();
  }
}

var testTimer;
function startTimer(){
  testTimer=setInterval(draw,100);
}
function stopTimer(){
  clearInterval(testTimer);
  if (alice.hp > bob.hp) console.log("alice win!");
  else{ console.log("bob win!");}
}

function draw(){
  ctx.globalCompositionOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.5)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.gloabalCompositionOperation = "lighter";

  // for alice
  if (step % aNUM ==0){
    alice.snifer[alice.k] = new Snifer(aNUM);
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

      if (
        alice.snifer[j].qx[i] > bob.qx-HITL/2 &&
        alice.snifer[j].qx[i] < bob.qx+HITL/2 &&
        alice.snifer[j].qy[i] > bob.qy-HITL/2 &&
        alice.snifer[j].qy[i] < bob.qy+HITL/2
      ){
        bob.hp -= alice.snifer[j].damage[i];
        alice.snifer[j].qx[i] = -1;
        alice.snifer[j].qy[i] = -1;
        alice.snifer[j].vx[i] = 0;
        alice.snifer[j].vy[i] = 0;
      }


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
  ctx.fillRect(alice.qx-HITL/2,alice.qy-HITL/2, HITL, HITL);

  // for bob
  if (step%bNUM==15){
    bob.snifer[bob.k] = new Snifer(bNUM);
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

      if (
        bob.snifer[j].qx[i] > bob.qx-HITL/2 &&
        bob.snifer[j].qx[i] < bob.qx+HITL/2 &&
        bob.snifer[j].qy[i] > bob.qy-HITL/2 &&
        bob.snifer[j].qy[i] < bob.qy+HITL/2
      ){
        alice.hp -= bob.snifer[j].damage[i];
        bob.snifer[j].qx[i] = -1;
        bob.snifer[j].qy[i] = -1;
        bob.snifer[j].vx[i] = 0;
        bob.snifer[j].vy[i] = 0;
      }
      
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
  ctx.fillRect(bob.qx-HITL/2,bob.qy-HITL/2,HITL,HITL);


  if (alice.hp < 0 || bob.hp < 0)  stopTimer();

  step += 1;
  console.log(step,"\talice",alice.hp,"'\tbob",bob.hp)
}

function hit_checker(attk, deff){

}
