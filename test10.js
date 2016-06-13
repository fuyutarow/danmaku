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
  move(){
    this.qx += this.vx;
    this.qy += this.vy;
    if (this.qx < 0 || this.qx > WIDTH) this.vx *= -1;
    if (this.qy < 0 || this.qy > HEIGHT) this.vy *= -1;
    ctx.fillStyle = this.col;
    ctx.fillRect(this.qx-HITL/2,this.qy-HITL/2,HITL,HITL);
  }
}

class sniffer {
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
}

class Alice extends Jiki{
  constructor(qx,qy,vx,vy){
    super(qx,qy,vx,vy);
    this.sniffer = [];
    this.k = 0;
    this.hp = 100;
    this.col;
  }
  sniffer_launch() {
    this.sniffer[this.k] = new sniffer(bNUM);
    for (var i = 0; i < this.sniffer[this.k].num; i++){
      this.sniffer[this.k].qx[i] = this.qx;
      this.sniffer[this.k].qy[i] = this.qy;
    }
    this.k++;
  }
  dandan(target){
    for (var j = 0; j < this.k; j++){
      this.sniffer[j].hit(target);
      this.sniffer[j].move(this.col);
    }
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
  if (step % aNUM ==0) alice.sniffer_launch();
  alice.dandan(bob);
  alice.move();

  // for bob
  if (step%bNUM==10) bob.sniffer_launch();
  bob.dandan(alice);
  bob.move();

  // 更新
  step += 1;
  console.log("step: %d \talice %d vs bob %d", step, alice.hp, bob.hp)
}
