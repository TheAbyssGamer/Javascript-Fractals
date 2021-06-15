var canvas = document.createElement("canvas");
canvas.width = 700; //700
canvas.height = 650; //600
canvas.className = "fractals-border";

document.body.appendChild(canvas);
var context = canvas.getContext("2d");
context.strokeStyle = "darkgreen";
context.fillStyle = "green";

var leafsTree = false;
var shadowsTree = false;
var bezierCurvesTree = false;


function draw(startX, startY, len, angle, branchWidth){
    context.lineWidth = branchWidth;
    context.beginPath();
    context.save();

    context.translate(startX, startY);
    context.rotate(angle * Math.PI/180);
    context.moveTo(0,0);
    //
    switch(bezierCurvesTree){
        case true:
            if(angle > 0){
                context.bezierCurveTo(8, -len/2, 8, -len/2, 0, -len);
            }else{
                context.bezierCurveTo(-8, -len/2, -8, -len/2, 0, -len);
            }
        break;
        case false:
            context.lineTo(0, -len);
        break;
    }
    //
    context.stroke();

    if(len <10){
        switch(leafsTree){
            case true:
                context.beginPath();
                context.arc(0, -len, 10, 0, Math.PI/2);
                context.fill();
                context.restore();
                return;
            break;
            case false:
                context.restore();
                return;
            break;
        }
    }

    draw(0,-len,len*0.8,angle-10,branchWidth*0.8);
    draw(0,-len,len*0.8,angle+10,branchWidth*0.8);

    context.restore();
}

var treeLenghtSlider = document.getElementById("TreeLenght");
var lengtText = document.getElementById("LenghtText");
var playButton = document.getElementById("PlayButton")
var pauseButton = document.getElementById("PauseButton");
var replayButton = document.getElementById("ReplayButton");
var treeColors = document.getElementById("TreeColors");
var colorElementShow = document.getElementById("TreeCurrentColor");
var checkLeafs = document.getElementById("CheckLeafs");
var checkShadows = document.getElementById("CheckShadows");
var checkCurves = document.getElementById("CheckCurves");
var saveButton = document.getElementById("SaveButton");

var interval;
var i=10;

function DownloadCanvasAsImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'fractal-tree.png');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
}

saveButton.onclick = function(){
    DownloadCanvasAsImage();
}

checkCurves.onchange = function(){
    bezierCurvesTree = checkCurves.checked;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    draw(350,600,i,0,15);
}

checkShadows.onchange = function(){
    if(checkShadows.checked == true){
        context.shadowBlur = 12;
        context.shadowColor = "rgba(0,0,0,0.8)";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        draw(350,600,i,0,15);
    }else{
        context.shadowBlur = 0;
        context.shadowColor = "rgba(0,0,0,0)";
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        draw(350,600,i,0,15);
    }
}

checkLeafs.onchange = function(){
    leafsTree = checkLeafs.checked;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    draw(350,600,i,0,15);
}

treeColors.oninput = function(){
	colorElementShow.style.backgroundColor = "hsl("+this.value+",100%,50%)";
	context.strokeStyle = "hsl("+this.value+",80%,50%)";
	context.fillStyle = "hsl("+this.value+",80%,35%)";
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	draw(350,600,i,0,15);
}

playButton.onclick = function(){
    console.log("Start");
	interval = setInterval(oneSecondFunction, 100);
}

pauseButton.onclick = function(){
	console.log("Stop");
	clearInterval(interval);
}

replayButton.onclick = function(){
	console.log("Restart");
	i=10;
}

treeLenghtSlider.oninput= function(){
	i = this.value;
    lengtText.innerHTML = Math.round(this.value);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    draw(350,600,this.value,0,10);
}



function oneSecondFunction() {
    // stuff you want to do every second
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    lengtText.innerHTML = Math.round(i);
    draw(350,600,i,0,15);
    i=i+1;
    if(i>120){
        clearInterval(interval);
    }
}
//draw(350,600,120,0,10);
