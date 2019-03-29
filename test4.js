console.log("ponponball!");

var one = Math.floor(Math.random()*2)*2-1
console.log(one);

var TPI = Math.PI*2;
const WIDTH = 640;
const HEIGHT = 480;
const NUM = 30;
var r = new Array(NUM);
var g = new Array(NUM);
var b = new Array(NUM);
var step;
var ctx;


class Jiki {
  constructor() {
    this.qx = Math.random()*WIDTH;
    this.qy = Math.random()*HEIGHT;
    this.vx = 0;//5.0*(Math.floor(Math.random()*2)*2-1);
    this.vy = 0;//5.0*(Math.floor(Math.random()*2)*2-1);
  }
  status(){console.log(
    "this.qx",this.qx,
    "this.qy",this.qy,
    "this.vx",this.vx,
    "this.yx",this.vy
  );}
}

class Snifer {
  constructor(num,qx,qy,vx,vy,radius){
    this.num = num;
    this.qx = new Array(this.num);
    this.qy = new Array(this.num);
    this.vx = new Array(this.num);
    this.vy = new Array(this.num);
    this.radius = new Array(this.num);
    for (var i = 0; i < 100; i++) {
      this.qx[i] = 320; // i;
      this.qy[i] = 240;// i%10*10;
      this.vx[i] = 2*Math.cos(i*TPI/this.num);
      this.vy[i] = 2*Math.sin(i*TPI/this.num);
      this.radius[i] = 5;
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

var jiki = new Jiki();
//var sn1 = new Snifer(NUM);
var snifer = [];// = new Snifer(NUM);
var k = 0;
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
  ctx.fillStyle = "rgba(8,8,12,.1)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.gloabalCompositionOperation = "lighter";

  if (step%30==0){ snifer[k] = new Snifer(NUM); k++;}
  for (var j = 0; j < k; j++){
    for (var i = 0; i < snifer[j].num; i++) {
      snifer[j].qx[i] += snifer[j].vx[i];
      snifer[j].qy[i] += snifer[j].vy[i];

      ctx.beginPath();
      ctx.fillStyle = 'rgb(' + r[i] + ',' + g[i] + ',' + b[i] + ')';
      ctx.arc(snifer[j].qx[i], snifer[j].qy[i], snifer[j].radius[i], 0, TPI, true);
      ctx.fill();
    }
  }

  jiki.qx += jiki.vx;
  jiki.qy += jiki.vy;

  if (jiki.qx < 0 || jiki.qx > WIDTH) jiki.vx *= -1;
  if (jiki.qy < 0 || jiki.qy > HEIGHT) jiki.vy *= -1;

  ctx.fillStyle = '#3399FF';
  ctx.fillRect(jiki.qx,jiki.qy,10,10);


  step += 1;
  try{console.log(step);}catch(e){}
}
