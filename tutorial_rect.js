console.log("hello world!");

function draw(){
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    ctx.fillRect(50,50,300,200);
    ctx.clearRect(120,80,200,140);
    ctx.strokeRect(200,20,180,260);

    var x = 0;
    var y = 300;
    ctx.beginPath();
    ctx.moveTo(50+x,50+y);
    ctx.lineTo(360+x,200+y);
    ctx.lineTo(140+x,250+y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50+x,250+y);
    ctx.lineTo(160+x,20+y);
    ctx.lineTo(340+x,50+y);
    ctx.closePath();
    ctx.fill();

    x = 400;
    y = 0;
    var TPI = 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(200+x,150+y,100,0,TPI,false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200+x,150+y,80,-TPI/6,TPI*3/4,false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200+x,150+y,60,0,TPI/8,false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200+x,150+y,20,0,TPI,false);
    ctx.fill();

    x = 400;
    y = 300;
    ctx.globalAlpha =  0.5;

    ctx.beginPath();
    ctx.fillStyle = '#3399FF';
    ctx.arc(150+x,150+y,80,0,TPI, true);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FF9933';
    ctx.arc(250+x,150+y,80,0,TPI, true);
    ctx.fill();
  }
}
