
//var one = Math.floor(Math.random()*2)*2-1
var TPI = Math.PI*2;
// 画面縦横px数
const WIDTH = 640;
const HEIGHT = 480;
// 弾幕半径
const RADIUS = 2;
// 自機当たり幅
const HITL = 10;
// デモ用変数
var aNUM = 30;
var bNUM = 15;
// ゲーム組み込み離散時間
var step;
// canvas組み込み変数，ゲーム状態遷移用
var ctx;

//参考//sites.google.com/site/jqueryjavascript/setintervaltoclearintervalno-shii-fang
// draw制御変数
var testTimer;
// startTimer実行でdraw再生
function startTimer(){
  // 第２引数はミリ秒表記
  testTimer=setInterval(draw,100);
}
// stopTimer実行でdraw停止
function stopTimer(){
  clearInterval(testTimer);
  if (alice.hp > bob.hp) console.log("alice win!");
  else{ console.log("bob win!");}
}

// canvas初期化
function init() {
  var canvas = document.getElementById('ponpon100');
  if (canvas.getContext){
    step = 0;
    ctx = canvas.getContext('2d');
    startTimer();
  }
}

// canvas遷移
function draw(){
  // drawの初期化
  ctx.globalCompositionOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.5)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.gloabalCompositionOperation = "lighter";

  // gameover
  if (alice.hp <= 0 || bob.hp <= 0)  stopTimer();

  // for alice
  if (step % aNUM ==0) alice.sniffer_launch(alice);
  alice.sniffer_dandan(bob);
  alice.move();

  // for bob
  if (step%bNUM==10) bob.sniffer_launch(bob);
  bob.sniffer_dandan(alice);
  bob.move();

  // 更新
  step += 1;
  console.log("step: %d \talice %d vs bob %d", step, alice.hp, bob.hp)
}


/*
ゲーム用クラスを定義する
Jikiは自機を生成するための設計書
Snifferは全方位無指向性弾幕を生成するための設計書
SnifferManはJikiを継承したクラスでSnifferを張ることができるようになったJiki
*/
class Jiki {
  // qx,qyは位置のxy座標を示すプロパティ
  constructor() {
    this.qx = Math.random()*WIDTH;
    this.qy = Math.random()*HEIGHT;
    this.vx;
    this.vy;
    this.hp = 100;
  }
  // move実行で自機移動
  move(){
    this.qx += this.vx;
    this.qy += this.vy;
    if (this.qx < 0 || this.qx > WIDTH) this.vx *= -1;
    if (this.qy < 0 || this.qy > HEIGHT) this.vy *= -1;
    ctx.fillStyle = this.col;
    ctx.fillRect(this.qx-HITL/2,this.qy-HITL/2,HITL,HITL);
  }
  // 特に無意味，消してもいいメソッド
  status(){console.log(
    "this.qx",this.qx,
    "this.qy",this.qy,
    "this.vx",this.vx,
    "this.yx",this.vy
  );}
}

class Sniffer {
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

  move(col){
    for (var i = 0; i < this.num; i++){
      this.qx[i] += this.vx[i];
      this.qy[i] += this.vy[i];
      // 描画
      ctx.beginPath();
      ctx.fillStyle = col;
      ctx.arc(this.qx[i], this.qy[i], this.radius[i], 0, TPI, true);
      ctx.fill();
    }
  }

  // 自機との当たり判定後，当たり弾幕を画面外へ移動せせる
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
  // このメソッドは消してもおk
  status(){console.log(
    "this.num", this.num,
    "this.qx", this.qx,
    "this.qy", this.qy,
    "this.vx", this.vx,
    "this.vy", this.vy,
    "this.radius", this.radius
  );}
}

class SnifferMan extends Jiki{
  constructor(qx,qy,vx,vy,hp){
    // 自機クラスから位置と速度とヒットポイントのプロパティを継承
    super(qx,qy,vx,vy,hp);
    this.sniffer = [];
    this.sniffer_k = 0;
    this.col;
  }
  // snifferを発射
  sniffer_launch() {
    this.sniffer[this.sniffer_k] = new sniffer(bNUM);
    for (var i = 0; i < this.sniffer[this.k].num; i++){
      this.sniffer[this.sniffer_k].qx[i] = this.qx;
      this.sniffer[this.sniffer_k].qy[i] = this.qy;
    }
    this.sniffer_k++;
  }
  // snifferの動きと当たり判定を実行
  sniffer_dandan(target){
    for (var j = 0; j < this.sniffer_k; j++){
      this.sniffer[j].hit(target);
      this.sniffer[j].move(this.col);
    }
  }
}

// プレイヤー登場
var alice = new SnifferMan();
alice.vx = 8.0*(Math.floor(Math.random()*2)*2-1);
alice.vy = 3.0*(Math.floor(Math.random()*2)*2-1);
alice.col = '#3399FF'

var bob = new SnifferMan();
bob.vx = 5.0*(Math.floor(Math.random()*2)*2-1);
bob.vy = 5.0*(Math.floor(Math.random()*2)*2-1);
bob.col = '#FF9933'
