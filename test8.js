console.log("ponponball!");

var one = Math.floor(Math.random()*2)*2-1
console.log(one);

var TPI = Math.PI*2;
const WIDTH = 640;
const HEIGHT = 480;
const RADIUS = 2;
const HITL = 10;
const aNUM = 30;
const bNUM = 15;
var step;
var ctx;


class Jiki {
  constructor() {
    this.qx = Math.random()*WIDTH;
    this.qy = Math.random()*HEIGHT;
    this.vx;
    this.vy;
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
    for (var i = 0; i < this.num; i++) {
      this.qx[i]; // i;
      this.qy[i];// i%10*10;
      this.vx[i] = 2*Math.cos(i*TPI/this.num);
      this.vy[i] = 2*Math.sin(i*TPI/this.num);
      this.radius[i] = RADIUS;
      this.damage[i] = 5;
    }
  }

  hit(deff){
    for (var i = 0; i < this.num; i++){
      if (
        this.qx[i] > deff.qx-HITL/2 &&
        this.qx[i] < deff.qx+HITL/2 &&
        this.qy[i] > deff.qy-HITL/2 &&
        this.qy[i] < deff.qy+HITL/2
      ){
        deff.hp -= this.damage[i];
        this.qx[i] = -1;
        this.qy[i] = -1;
        this.vx[i] = 0;
        this.vy[i] = 0;
      }
    }
  }
  move(col){
    for (var i = 0; i < this.num; i++){
      this.qx[i] += this.vx[i];
      this.qy[i] += this.vy[i];

      ctx.beginPath();
      ctx.fillStyle = col;
      ctx.arc(this.qx[i], this.qy[i], this.radius[i], 0, TPI, true);
      ctx.fill();
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
alice.vx = 8.0*(Math.floor(Math.random()*2)*2-1);
alice.vy = 3.0*(Math.floor(Math.random()*2)*2-1);
alice.col = '#3399FF'

var bob = new Alice();
bob.vx = 5.0*(Math.floor(Math.random()*2)*2-1);
bob.vy = 5.0*(Math.floor(Math.random()*2)*2-1);
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
  // drawの初期化
  ctx.globalCompositionOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.5)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.gloabalCompositionOperation = "lighter";

  // gameover
  if (alice.hp <= 0 || bob.hp <= 0)  stopTimer();

  // for alice
  if (step % aNUM ==0) snifer_launch(alice);

  for (var j = 0; j < alice.k; j++){
    alice.snifer[j].hit(bob);
    alice.snifer[j].move(alice.col);
  }
  jiki_move(alice);

  // for bob
  if (step%bNUM==10) snifer_launch(bob);

  for (var j = 0; j < bob.k; j++){
    bob.snifer[j].hit(alice);
    bob.snifer[j].move(bob.col);
  }
  jiki_move(bob);

  // 更新
  step += 1;
  console.log("step: %d \talice %d vs bob %d", step, alice.hp, bob.hp)
}

function jiki_move(attk){
  attk.qx += attk.vx;
  attk.qy += attk.vy;
  if (attk.qx < 0 || attk.qx > WIDTH) attk.vx *= -1;
  if (attk.qy < 0 || attk.qy > HEIGHT) attk.vy *= -1;
  ctx.fillStyle = attk.col;
  ctx.fillRect(attk.qx-HITL/2,attk.qy-HITL/2,HITL,HITL);
}

function snifer_launch(attk) {
  attk.snifer[attk.k] = new Snifer(bNUM);
  for (var i = 0; i < attk.snifer[attk.k].num; i++){
    attk.snifer[attk.k].qx[i] = attk.qx;
    attk.snifer[attk.k].qy[i] = attk.qy;
  }
  attk.k++;
}
