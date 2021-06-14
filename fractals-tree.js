var canvas = document.createElement("canvas");
canvas.width = 700;
canvas.height = 600;
canvas.className = "fractals-border";

document.body.appendChild(canvas);
var context = canvas.getContext("2d");

function draw(startX, startY, len, angle, branchWidth){
    context.lineWidth = branchWidth;
    context.beginPath();
    context.save();

    context.translate(startX, startY);
    context.rotate(angle * Math.PI/180);
    context.moveTo(0,0);
    context.lineTo(0, -len);
    context.stroke();

    if(len < 10){
        context.restore();
        return;
    }

    draw(0,-len,len*0.8,-15,branchWidth*0.8);
    draw(0,-len,len*0.8,15,branchWidth*0.8);

    context.restore();
}

var treeLenghtSlider = document.getElementById("TreeLenght");
var lengtText = document.getElementById("LenghtText");
var playButton = document.getElementById("PlayButton")

playButton.onclick = function(){
    console.log("dadad");
}

treeLenghtSlider.oninput= function(){
    lengtText.innerHTML = Math.round(this.value);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    draw(350,600,this.value,0,10);
}




var i=10;
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
var interval = setInterval(oneSecondFunction, 100);