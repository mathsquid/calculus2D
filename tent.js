var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var windowRange=[-10,10,-10,10];
var xtickscale=Math.PI;
var ytickscale=1;

var inn;

reDraw();
plotLine(1,0);

canvas.addEventListener('dblclick', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        recenterMouse(xInvT(mousePos.x), yInvT(mousePos.y));
      }, false);

var xscale;
var yscale;
var exp;
var deriv;

function updateXZero (){
  xZero = math.parse(document.getElementById("xZero").value).compile().eval();
  inn=0;
  xNow = xZero;
  outputText= "x_" + inn + " = " + xNow;
  reDraw();
}

function updateScale(){
  xscale = (canvas.width)/(windowRange[1]-windowRange[0]);
  yscale = (canvas.height)/(windowRange[3]-windowRange[2]);
}

function plotLine(m,b){
  ctx.beginPath();
  //  var color = "#"+Math.floor(Math.random()*65535).toString(16);
  var color = "Blue";
  ctx.strokeStyle=color;
  for (var x=1; x<canvas.width; x++){
    var tmpx = x/xscale + windowRange[0];
     y = m*tmpx+b;
     y = canvas.height - (y*yscale-windowRange[2]*yscale);
    ctx.lineTo(x, y);
    }
  ctx.stroke();
}



function drawAxes(){
  var xticklength= (windowRange[1]-windowRange[0])/160;
  var ytickLength= (windowRange[3]-windowRange[2])/90;

  ctx.strokeStyle="#000000";
  // draw the x-axis
  if (windowRange[2]<0 & windowRange[3]>0){
    var xAxisLocation= (1+windowRange[2]/(windowRange[3]-windowRange[2])) * canvas.height;
    ctx.beginPath();
    ctx.strokeStyle="#000000"
    ctx.moveTo(0,xAxisLocation);
    ctx.lineTo(canvas.width, xAxisLocation);
    ctx.stroke();

    // and x-tickmarks
    for (var a=windowRange[0]- windowRange[0]%xtickscale; a<windowRange[1]; a+=xtickscale){
      ctx.beginPath();
      ctx.moveTo(xT(a),yT(ytickLength));
      ctx.lineTo(xT(a),yT(-ytickLength));
      ctx.stroke();
    }
  }


  // draw the y-axis
  if (windowRange[0]<0 & windowRange[1]>0){
    var yAxisLocation= (-windowRange[0]/(windowRange[1]-windowRange[0])) * canvas.width;
    ctx.beginPath();
    ctx.strokeStyle="#000000"
    ctx.moveTo(yAxisLocation,0);
    ctx.lineTo(yAxisLocation, canvas.height);
    ctx.stroke();
  }

  // and y-tickmarks
  for (var a=windowRange[2]-windowRange[2]%ytickscale; a<windowRange[3]; a+=ytickscale){
    ctx.beginPath();
    ctx.moveTo(xT(-xticklength),yT(a));
    ctx.lineTo(xT(xticklength),yT(a));
    ctx.stroke();
  }

}

function xT(x){
  return x*xscale - windowRange[0]*xscale;
}
function xInvT(x){
  return x/xscale + windowRange[0];
}


function yT(y){
  return canvas.height - y*yscale+windowRange[2]*yscale;
}

function yInvT(y){
  return (canvas.height - y)/yscale + windowRange[2];
}


function drawgraph(){
  parseAndCompile();
  ctx.beginPath();
  ctx.strokeStyle="Green"
  for (var x=1; x<canvas.width; x++){
    var tmpx = x/xscale + windowRange[0];
     y = f(tmpx);
     y = canvas.height - (y*yscale-windowRange[2]*yscale);
    ctx.lineTo(x, y);
    }
  ctx.stroke();
}

function clearTheArea(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}
function zoomOneToOneX(){
  var currentWidth = windowRange[1]-windowRange[0];
  var currentHeight=windowRange[3]-windowRange[2];
  var verticalCenter = windowRange[2]+currentHeight/2;
  var newHeight=currentWidth*9/16;
  windowRange[2]=verticalCenter-newHeight/2;
  windowRange[3]=verticalCenter+newHeight/2;

  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomOneToOneY(){
  var currentWidth = windowRange[1]-windowRange[0];
  var currentHeight=windowRange[3]-windowRange[2];
  var horizontalCenter = windowRange[0]+currentWidth/2;
  var newWidth=currentHeight*16/9;
  windowRange[0]=horizontalCenter-newWidth/2;
  windowRange[1]=horizontalCenter+newWidth/2;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomOut(){
  var currentWidth = windowRange[1]-windowRange[0];
  var currentHeight=windowRange[3]-windowRange[2];
  var horizontalCenter = windowRange[0]+currentWidth/2;
  var verticalCenter = windowRange[2]+currentHeight/2;
  windowRange[0]=horizontalCenter-currentWidth;
  windowRange[1]=horizontalCenter+currentWidth;
  windowRange[2]=verticalCenter-currentHeight;
  windowRange[3]=verticalCenter+currentHeight;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomInX(){
  var currentWidth = windowRange[1]-windowRange[0];
  var horizontalCenter = windowRange[0]+currentWidth/2;
  windowRange[0]=horizontalCenter-currentWidth/4;
  windowRange[1]=horizontalCenter+currentWidth/4;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomOutX(){
  var currentWidth = windowRange[1]-windowRange[0];
  var horizontalCenter = windowRange[0]+currentWidth/2;
  windowRange[0]=horizontalCenter-currentWidth;
  windowRange[1]=horizontalCenter+currentWidth;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomOutY(){
  var currentHeight=windowRange[3]-windowRange[2];
  var verticalCenter = windowRange[2]+currentHeight/2;
  windowRange[2]=verticalCenter-currentHeight;
  windowRange[3]=verticalCenter+currentHeight;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomInY(){
  var currentHeight=windowRange[3]-windowRange[2];
  var verticalCenter = windowRange[2]+currentHeight/2;
  windowRange[2]=verticalCenter-currentHeight/4;
  windowRange[3]=verticalCenter+currentHeight/4;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}
function zoomIn(){
  var currentWidth = windowRange[1]-windowRange[0];
  var currentHeight=windowRange[3]-windowRange[2];
  var horizontalCenter = windowRange[0]+currentWidth/2;
  var verticalCenter = windowRange[2]+currentHeight/2;
  windowRange[0]=horizontalCenter-currentWidth/4;
  windowRange[1]=horizontalCenter+currentWidth/4;
  windowRange[2]=verticalCenter-currentHeight/4;
  windowRange[3]=verticalCenter+currentHeight/4;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}

function recenterMouse(newX, newY){
  var currentWidth = windowRange[1]-windowRange[0];
  var currentHeight=windowRange[3]-windowRange[2];
  windowRange[0]=newX-currentWidth/2;
  windowRange[1]=newX+currentWidth/2;
  windowRange[2]=newY-currentHeight/2;
  windowRange[3]=newY+currentHeight/2;
  zoom(windowRange[0],windowRange[1],xtickscale, windowRange[2],windowRange[3], ytickscale);
}



function reDraw(){
  windowRange[0]=math.parse(document.getElementById("x_min").value).compile().eval();
  windowRange[1]=math.parse(document.getElementById("x_max").value).compile().eval();
  windowRange[2]=math.parse(document.getElementById("y_min").value).compile().eval();
  windowRange[3]=math.parse(document.getElementById("y_max").value).compile().eval();
  xtickscale    =math.parse(document.getElementById("x_tick").value).compile().eval();
  ytickscale    =math.parse(document.getElementById("y_tick").value).compile().eval();


  clearTheArea();
  updateScale();
  drawAxes();
  drawgraph();
  if (document.getElementById("showRectangles").checked) drawRectangles();
}




function zoom(xmin,xmax,xtick,ymin,ymax,ytick){
  windowRange[0]=xmin;
  windowRange[1]=xmax;
  windowRange[2]=ymin;
  windowRange[3]=ymax;
  xtickscale    = xtick;
  ytickscale    = ytick;
  updateWindowSettingBox();
  clearTheArea();
  updateScale();
  drawAxes();
  drawgraph();
  if (document.getElementById("showRectangles").checked) drawRectangles();

}

function updateWindowSettingBox(){
  document.getElementById("x_min").value = windowRange[0];
  document.getElementById("x_max").value = windowRange[1];
  document.getElementById("y_min").value = windowRange[2];
  document.getElementById("y_max").value = windowRange[3];
  document.getElementById("x_tick").value = xtickscale;
  document.getElementById("y_tick").value = ytickscale;

}


function parseAndCompile(){
  var ft = document.getElementById("functionString").value;
  exp = math.parse(ft).compile();
  deriv = math.derivative(ft, "x").compile();


}

function f(x) {
  for (var i=0; i<5; i++){
    if (x<=.5) x = 3*x;
    else if (x>.5)  x = 3-3*x;
  }
  return x;
}


var outputText="";
outarea = document.getElementById("iterateOutput")





function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
