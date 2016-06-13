console.log("ponponball!");
document.body.addEventListener( "click", function( e ) {
	// マウス位置を取得する
	var mouseX = e.pageX ;	// X座標
	var mouseY = e.pageY ;	// Y座標
} ) ;
var one = Math.floor(Math.random()*2)*2-1
console.log(one);

var TPI = Math.PI*2;
var vx = 5.0*(Math.floor(Math.random()*2)*2-1);
var vy = 5.0*(Math.floor(Math.random()*2)*2-1);
var x = Math.random()*400;
var y = Math.random()*300;
var ctx;

function init() {
  var canvas = document.getElementById('ponponball');
  if (canvas.getContext){
    ctx = canvas.getContext('2d');
    setInterval(draw,33);
  }
}

function draw(){
  ctx.globalCompositionOperation = "source-over";
  ctx.fillStyle = "rgba(8,8,12,.1)";
  ctx.fillRect(0,0,400,300);
  ctx.gloabalCompositionOperation = "lighter";

  x += vx;
  y += vy;

  if (x < 0 || x > 400) vx *= -1;
  if (y < 0 || y > 300) vy *= -1;


  ctx.beginPath();
  ctx.fillStyle = '#3399FF';
  ctx.arc(x,y,4,0,TPI,true);
  ctx.fill();
}
