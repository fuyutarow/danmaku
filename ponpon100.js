const NUM = 500;
const WIDTH = 640;
const HEIGHT = 480;
var vx = new Array(NUM);
var vy = new Array(NUM);
var px = new Array(NUM);
var py = new Array(NUM);
var radius = new Array(NUM);
var r = new Array(NUM);
var g = new Array(NUM);
var b = new Array(NUM);
var ctx;

function init(){
  var canvas = document.getElementById('ponpon100');
  if (canvas.getContext){
    ctx = canvas.getContext('2d');
    for(var i = 0; i < NUM; i++){
      vx[i] = Math.random() * 8.0 - 4.0;
      vy[i] = Math.random() * 8.0 - 4.0;
      px[i] = WIDTH / 2;
      py[i] = HEIGHT / 2;
      radius[i] = Math.random() * 8.0 + 1.0;
      r[i] = Math.floor(Math.random() * 64);
      g[i] = Math.floor(Math.random() * 64);
      b[i] = Math.floor(Math.random() * 64);
    }
    setInterval(draw, 33);
  }
}

function draw(){
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.1)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalCompositeOperation = "lighter";

  for(var i = 0; i < NUM; i++){
    //位置を更新
    px[i] += vx[i];
    py[i] += vy[i];

    if(px[i] < 0 || px[i] > WIDTH) vx[i] *= -1.0;
    if(py[i] < 0 || py[i] > HEIGHT) vy[i] *= -1.0;

    //更新した座標で円を描く
    ctx.beginPath();
    ctx.fillStyle = 'rgb(' + r[i] + ',' + g[i] + ',' + b[i] + ')';
    ctx.arc(px[i], py[i], radius[i], 0, Math.PI*2.0, true);
    ctx.fill();
  }
}
