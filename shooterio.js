var TPI = Math.PI*2;
const WIDTH = 640;
const HEIGHT = 480;
const RADIUS = 2;
const HITL = 10;
const aNUM = 30;
const bNUM = 15;
var step;
var ctx;
var game;


var players = {};




class Jiki {
  constructor() {
    this.name;
    this.qx = Math.random()*WIDTH;
    this.qy = Math.random()*HEIGHT;
    this.vx;
    this.vy;
    this.hp = 100;
  }
  move(){
    this.qx += this.vx;
    this.qy += this.vy;
    if (this.qx < 0 || this.qx > WIDTH) this.vx *= -1;
    if (this.qy < 0 || this.qy > HEIGHT) this.vy *= -1;
    // display name
    ctx.font= 'bold 24px Century Gothic';
    ctx.strokeStyle = '#00A3D9';
    ctx.lineWidth = 0.1;
    ctx.lineJoin = 'round';
    ctx.fillText(this.name+" "+this.hp,this.qx-HITL*2,this.qy-HITL)

    ctx.fillStyle = this.col;
    ctx.fillRect(this.qx-HITL/2,this.qy-HITL/2,HITL,HITL);
  }
}

class Danmaku {
  constructor(num){
    this.num = num;
    this.qx = new Array(this.num);
    this.qy = new Array(this.num);
    this.vx = new Array(this.num);
    this.vy = new Array(this.num);
    this.radius = new Array(this.num);
    this.damage = new Array(this.num);
    this.col;
    for (var i = 0; i < this.num; i++) {
      this.qx[i]; // i;
      this.qy[i];// i%10*10;
      this.vx[i];// = 2*Math.cos(i*TPI/this.num);
      this.vy[i];// = 2*Math.sin(i*TPI/this.num);
      this.radius[i];// = RADIUS;
      this.damage[i];// = 5;
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

class Sniffer extends Danmaku{
  constructor(num,vx,vy,radius,damage) {
    super(num,vx,vy,radius,damage);
    for (var i = 0; i < this.num; i++) {
      this.vx[i] = 2*Math.cos(i*TPI/this.num);
      this.vy[i] = 2*Math.sin(i*TPI/this.num);
      this.radius[i] = RADIUS;
      this.damage[i] = 5;
    }
  }
}

class SnifferMan extends Jiki{
  constructor(qx,qy,vx,vy){
    super(qx,qy,vx,vy);
    this.sniffer = [];
    this.k = 0;
  }
  sniffer_launch() {
    this.sniffer[this.k] = new Sniffer(bNUM);
    for (var i = 0; i < this.sniffer[this.k].num; i++){
      this.sniffer[this.k].qx[i] = this.qx;
      this.sniffer[this.k].qy[i] = this.qy;
    }
    this.k++;
  }
  dandan(pray){
    //for (var key in players){
      //console.log(key,players[key],self );

      //if (players[key] == self) continue;
      for (var j = 0; j < this.k; j++){
        this.sniffer[j].hit(pray);
        this.sniffer[j].move(this.col);
      }
    //}
  }
}

/*
class Alice extends SnifferMan{
  constructor(name,vx,vy,col){
  super(name,vx,vy,col);
  this.name = "alice";
  this.vx = 5*(Math.floor(Math.random()*2)*2-1);
  this.vy = 5*(Math.floor(Math.random()*2)*2-1);
  this.col = '#3399FF'
  }
  action(){
    if (step % 30 ==0) this.sniffer_launch();
    this.dandan(bob);
    this.move();
  }
}
var alice = new Alice();
const aliceID = 160603;
players[aliceID] = alice;
*/

class Bob extends SnifferMan{
  constructor(name,vx,vy,col){
  super(name,vx,vy,col);
  this.name = "bob";
  this.vx = 1*(Math.floor(Math.random()*2)*2-1);
  this.vy = 5*(Math.floor(Math.random()*2)*2-1);
  this.col = '#FF9933'
  }
  action(){
    if (step % 30 ==0) this.sniffer_launch();
    this.dandan(alice);
    this.move();
  }
}
var bob = new Bob();
const bobID = 160614;
players[bobID] = bob;






function init() {
  var canvas = document.getElementById('danmakuio');
  if (canvas.getContext){
    step = 0;
    ctx = canvas.getContext('2d');
    game = new Game();
    $(function(){
      $('#start').click(function(){
        game.startTimer();
      })
      $('#stop').click(function(){
        game.stopTimer();
      })
    })

  }
}

class Game {
  constructor(testTimer) {
    this.testTimer;
  }
  startTimer(){
    this.testTimer=setInterval(draw,100);
  }
  stopTimer(){
    clearInterval(this.testTimer);
    $(function(){
      if (alice.hp <= 0) $('.console').append("alice dead!");
      if (bob.hp <= 0 ) $('.console').append("bob dead!");
    })
  }
}

function draw(){
  // drawの初期化
  ctx.globalCompositionOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.5)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.gloabalCompositionOperation = "lighter";

  // gameover
  if (alice.hp <= 0 || bob.hp <= 0)  game.stopTimer();

  // for alice
  alice.action();

  // for bob
  bob.action();

  // 更新
  step += 1;
  $(function(){
    $('.console').text(
      "step: "+step+
      "\talice "+alice.hp+
      " vs bob "+bob.hp
    );
  })
  console.log("step: %d \talice %d vs bob %d", step, alice.hp, bob.hp)
}
