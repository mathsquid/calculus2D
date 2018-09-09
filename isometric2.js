var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var spacing = 16;

var dotsize=1;

var snakeX, snakeY;
var dotwidth = canvas.width/spacing;
var dotheight = canvas.height/spacing;

function pickStartingPoint(){
snakeX = Math.floor(Math.random()*dotwidth);
snakeY = Math.floor(Math.random()*dotheight);
if (snakeY %2 ==0) snakeX+=.5;
snakeX *= spacing;
snakeY *= spacing;
console.log(snakeX/spacing, snakeY/spacing);
}

drawIsoDots(spacing,dotsize,50,50,50);
pickStartingPoint();
growSnake();
setInterval(growSnake,10);

function drawIsoDots(dist,dotsize,sd,bd,dd){
  var start;
  for (var y=spacing; y<canvas.height; y+=spacing){
    if ((y/spacing)%2){
      start=spacing;
    }
    else {
      start=spacing*1.5;
      }
    var color = 0;
    for (var x=start; x<canvas.width; x+=spacing){
        ctx.fillRect(x-dotsize/2,y-dotsize/2,dotsize,dotsize);
    }
  }
}

function crazySnake(k){
  for (var i=0; i<k; i++) growSnake();
}


function growSnake(){
  var nextX=snakeX, nextY=snakeY;
    var direction = Math.floor(Math.random()*6);
    switch(direction){
      case 0: //NW
        if (snakeX>0 && snakeY>0){
         nextX = snakeX-spacing/2;
         nextY = snakeY-spacing;
        }
      break;
      case 1: //NE
        if (snakeX<canvas.width && snakeY>0){
           nextX = snakeX+spacing/2;
           nextY = snakeY-spacing;
         }
      break;
      case 2: //E
        if (snakeX<canvas.width) nextX = snakeX+spacing;
      break;
      case 3: //SE
        if (snakeX<canvas.width  && snakeY<canvas.height){
          nextX = snakeX+spacing/2;
          nextY = snakeY+spacing;
        }
      break;
      case 4: //SW
        if (snakeX>0 & snakeY<canvas.height){
          nextX = snakeX-spacing/2;
          nextY = snakeY+spacing;
        }
      break;
      case 5: //W
        if (snakeX>0) nextX = snakeX-spacing;
      break;
    }

    var redval = Math.floor(Math.random()*64);
    var grnval = Math.floor(Math.random()*64);
    var bluval = Math.floor(Math.random()*64);
    var color  = "#"+redval.toString(16)+grnval.toString(16)+bluval.toString(16);
    ctx.strokeStyle=color;

    ctx.beginPath();
    ctx.moveTo(snakeX,snakeY);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
    snakeX=nextX;
    snakeY=nextY;



}
    /*
        var sdr = Math.floor(Math.random()*100);
        if(sdr<sd){
          // var color = "#"+(Math.floor(Math.random()*128)*65793).toString(16);
          ctx.strokeStyle=color;
          ctx.beginPath()
          ctx.moveTo(x,y);
          ctx.lineTo(x+spacing/2,y+spacing);
          ctx.stroke();
        }
        var bdr = Math.floor(Math.random()*100);
        if(bdr<bd){
          // var color = "#"+Math.floor(Math.random()*16).toString(16);
          ctx.strokeStyle=color;
          ctx.beginPath()
          ctx.moveTo(x,y);
          ctx.lineTo(x+spacing/2,y-spacing);
          ctx.stroke();
        }
        var ddr = Math.floor(Math.random()*100);
        if(ddr<dd){
          // var color = "#"+Math.floor(Math.random()*16).toString(16);
          ctx.strokeStyle=color;
          ctx.beginPath()
          ctx.moveTo(x,y);
          ctx.lineTo(x+spacing,y);
          ctx.stroke();
        }
      }




    }
  }
*/




  function clear(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  function redraw(){
    pickStartingPoint();
    // Get parameters from the webpage, clear, and redraw
    spacing=parseFloat(document.getElementById("spacing").value)
    var sd=parseFloat(document.getElementById("slashDensity").value)
    var bd=parseFloat(document.getElementById("backslashDensity").value)
    var dd=parseFloat(document.getElementById("dashDensity").value)
    var dotsize=parseFloat(document.getElementById("dotsize").value)
    clear();
    drawIsoDots(spacing,dotsize,sd,bd,dd);
  }
