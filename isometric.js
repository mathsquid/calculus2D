var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

var spacing = 8;

var dotsize=1;

drawIsoDots(spacing,dotsize,50,50,50);


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
        var sdr = Math.floor(Math.random()*100);
        if(sdr<sd){
//          var color = "#"+(Math.floor(Math.random()*128)*65793).toString(16);
          ctx.strokeStyle=color;
          ctx.beginPath()
          ctx.moveTo(x,y);
          ctx.lineTo(x+spacing/2,y+spacing);
          ctx.stroke();
        }
        var bdr = Math.floor(Math.random()*100);
        if(bdr<bd){
//          var color = "#"+Math.floor(Math.random()*16).toString(16);
          ctx.strokeStyle=color;
          ctx.beginPath()
          ctx.moveTo(x,y);
          ctx.lineTo(x+spacing/2,y-spacing);
          ctx.stroke();
        }
        var ddr = Math.floor(Math.random()*100);
        if(ddr<dd){
//          var color = "#"+Math.floor(Math.random()*16).toString(16);
          ctx.strokeStyle=color;
          ctx.beginPath()
          ctx.moveTo(x,y);
          ctx.lineTo(x+spacing,y);
          ctx.stroke();
        }
      }




    }
  }
  function clear(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  function redraw(){
    spacing=parseFloat(document.getElementById("spacing").value)
    var sd=parseFloat(document.getElementById("slashDensity").value)
    var bd=parseFloat(document.getElementById("backslashDensity").value)
    var dd=parseFloat(document.getElementById("dashDensity").value)
    var dotsize=parseFloat(document.getElementById("dotsize").value)
    clear();
    drawIsoDots(spacing,dotsize,sd,bd,dd);
  }
