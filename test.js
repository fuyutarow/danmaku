class Cat {
  constructor(name) {
    this.name = name;
  }
  set name(name){
    this._name = name;
  }
  //get name(){
  //  return this._name
  //
  walk(){
    console.log(this._name+" is waiking in the St.Nanaki.");
  }
}

var cat1 = new Cat("Tama");
cat1.walk();

const TPI = Math.PI * 2;
const NUM = 100;
const WIDTH = 640;
const HEIGHT = 480;
var r = new Array(NUM);
var g = new Array(NUM);
var b = new Array(NUM);
var ctx;

class Snifer {
  constructor(num,qx,qy,vx,vy,radius){
    //this.num = num;
    this.qx = new Array(this.num);
    this.qy = new Array(this.num);
    this.vx = new Array(this.num);
    this.vy = new Array(this.num);
    this.radius = new Array(this.num);
    for (var i = 0; i < 100; i++) {
      this.qx[i] = 320; // i;
      this.qy[i] = 240;// i%10*10;
      this.vx[i] = 2*Math.cos(i*TPI/100);
      this.vy[i] = 2*Math.sin(i*TPI/100);
      this.radius[i] = 5;
    }
  }

  set num(num){
    this.num = num;
  }

  status(){
    console.log(
      "this.num", this.num,
      "this.qx", this.qx,
      "this.qy", this.qy,
      "this.vx", this.vx,
      "this.vy", this.vy,
      "this.radius", this.radius
    );
  }
}

var sn1 = new Snifer(100);
sn1.status();
console.log(sn1.num);

function init(){
  var canvas = document.getElementById('ponpon100');
  if (canvas.getContext){
    ctx = canvas.getContext('2d');
    var sn1 = new Snifer(100);
    for(var i = 0; i < 100; i++){
      r[i] = Math.floor(Math.random() * 64);
      g[i] = Math.floor(Math.random() * 64);
      b[i] = Math.floor(Math.random() * 64);
    }
    sn1.status();
    setInterval(draw, 33);


  }
}

function draw(){

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.1)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalCompositeOperation = "lighter";
  for(var i = 0; i < 100; i++){
    //位置を更新
    sn1.qx[i] += sn1.vx[i];
    sn1.qy[i] += sn1.vy[i];

    if(sn1.qx[i] < 0 || sn1.qx[i] > WIDTH) sn1.vx[i] *= -1.0;
    if(sn1.qy[i] < 0 || sn1.qy[i] > HEIGHT) sn1.vy[i] *= -1.0;

    //更新した座標で円を描く
    ctx.beginPath();
    ctx.fillStyle = 'rgb(' + r[i] + ',' + g[i] + ',' + b[i] + ')';
    ctx.arc(sn1.qx[i], sn1.qy[i], sn1.radius[i], 0, TPI, true);
    ctx.fill();
  }

  //sn1.status();
}
